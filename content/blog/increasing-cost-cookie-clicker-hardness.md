---
title: "A proof of the increasing-cost Cookie Clicker hardness conjecture"
date: "2026-09-28"
draft: false
---

## Abstract {#abstract}

Consider a continuous-time production process that starts with zero capital and production rate one. Purchasing an item consumes capital, increases the production rate, and multiplies that item’s future price by a factor greater than one. The objective is to accumulate a prescribed amount of unspent capital as quickly as possible. Demaine, Ito, Langerman, Lynch, Rudoy, and Xiao conjectured in their 2018 Cookie Clicker preprint, subsequently published in 2020, that this optimization problem is weakly NP-hard. We prove the conjectured hardness by a polynomial-time reduction from Partition. A quadratic correction to the initial prices makes the completion time of every ordered subset equal to a constant plus a squared subset-sum error, with an explicit, uniformly bounded rational remainder. We first use a common input-dependent multiplier to make repeated purchases infeasible before success. A purchase-deletion argument then strengthens the result: the rational-input decision problem is NP-complete for every fixed rational multiplier greater than one, including $1.15$. For the structured family used in the reduction, we also give an optimal ordering theorem and an exact pseudopolynomial dynamic program.

## 1. Introduction and the conjecture {#sec-introduction}

An incremental production process converts current capital into a higher future production rate. The resulting optimization problem involves both selecting investments and deciding when to make them. Even a deterministic process with a single resource can couple these choices: buying an item delays the accumulation of capital but accelerates all later accumulation.

Demaine et al. \[[1](#section-ref-demaine2020cookie)\] formalized this problem in their study of Cookie Clicker. Their continuous-time model specifies an initial balance, an initial production rate, and item types with additive rate increases and geometrically increasing prices. They distinguish a balance target, called the $M$ version, from a production-rate target, called the $R$ version. In Section 4, the second conjecture concerns the $M$ version with initial balance zero and initial rate one. In our notation, the conjecture asks for weak NP-hardness of minimizing the time at which the balance first reaches $M$, when the number of item types is part of the input. The conjecture appears in the August 2018 preprint and remains stated in the journal article published in 2020.

The earlier paper establishes hardness for related variants, including a rate target, a model allowing nonzero initial capital, and a discrete-time process. These results motivate the remaining continuous-time balance-target question. Here we give a reduction for precisely the zero-capital, unit-initial-rate model. We first allow a common price multiplier supplied as input, then strengthen the result to every fixed rational multiplier greater than one, including $1.15$.

### 1.1 Main result {#main-result}

All rational numbers in this paper have finite binary encodings. The decision problem asks whether the target balance can be reached by a given rational deadline.

{#thm-main}

**Theorem 1.1** (Hardness from zero initial capital).  *The continuous-time, increasing-cost Cookie Clicker balance-target decision problem is NP-hard when the initial balance is zero and the initial production rate is one. This remains true under all of the following restrictions simultaneously:*

1. *every initial price and every rate increase is a positive rational number;*

2. *all item types share one integer price multiplier $\alpha>1$;*

3. *every first price is strictly less than the target $M$;*

4. *every second price is strictly greater than $M$.*

*The restriction defined by these conditions is in NP, and hence is NP-complete. The hardness reduction is from Partition. Moreover, on the calibrated family constructed in the reduction, exact optimization admits a pseudopolynomial algorithm.*

The theorem establishes the conjectured weak hardness. The pseudopolynomial statement is limited to the calibrated family. We do not assert a pseudopolynomial algorithm for the full model, membership in NP for the full model, or the absence of stronger hardness results. This distinction prevents a reduction from a numerical NP-complete problem from being used to infer an unwarranted classification of every instance.

**Theorem 1.2** (Fixed-multiplier strengthening; proved as Theorem [6.1](#section-thm-fixed)).  *For every fixed rational $\alpha>1$, the rational-input balance-target decision problem with that same multiplier for every type, zero initial balance, and initial rate one is NP-complete. In particular, the multiplier can be fixed at $23/20=1.15$.*

Here NP membership is proved for the whole fixed-multiplier model. The earlier qualification about the full model refers to arbitrary input multipliers, which can approach one as the input length grows.

### 1.2 Why the reduction works {#why-the-reduction-works}

Let positive integers $a_1,\ldots,a_k$ sum to $2B$. We create one item for each integer. With a sufficiently large integer $W$, the rate increase and first price of item $i$ are

$$
x_i=\frac{a_i}{W},\qquad
 y_i=a_i-\frac{a_i^2}{2W}.
$$

 The target is $M=W+B$. The multiplier prevents repeated purchases before reaching the target, so a purchase sequence represents a subset. The term $-a_i^2/(2W)$ is chosen to cancel the leading dependence of purchase time on the order of that subset. If its total integer weight is $S$, its completion time has the exact representation

$$
C+\frac{(S-B)^2}{2W}+R,
 \qquad
 C=W+B-\frac{B^2}{2W}.
$$

 We choose $W=128B^3$ and prove $|R|\le 3/(32W)$ for every order and every subset. Since $S$ is an integer, $S=B$ and $S\ne B$ are separated by a squared-error gap of at least $1/(2W)$. A deadline placed inside this gap completes the reduction.

The proof uses exact rational identities throughout. In particular, the remainder estimate is valid for all positive integer input lists, rather than only in an asymptotic limit. Section [2](#section-sec-normal) derives the required scheduling normal form directly from cash-flow feasibility. Section [3](#section-sec-reduction) gives the construction and proves the separation. Section [4](#section-sec-encoding) handles computational encoding and NP membership. Section [5](#section-sec-dp) proves the additional ordering and dynamic-programming results. Section [6](#section-sec-fixed) establishes the fixed-multiplier strengthening by showing that repeated purchases cannot improve an optimal schedule on the constructed instances.

## 2. Model and a scheduling normal form {#sec-normal}

### 2.1 Finite rational input and the balance target {#finite-rational-input-and-the-balance-target}

An instance has $k$ item types, a positive rational target $M$, and a nonnegative rational deadline $H$. Item $i$ has rate increase $x_i>0$, initial price $y_i>0$, and multiplier $\alpha_i>1$, all rational. Its $(q+1)$st copy costs $y_i\alpha_i^q$ for each integer $q\ge0$. The process starts at time zero with balance zero and rate one. Between purchases, the balance increases continuously at the current rate. A purchase is instantaneous and allowed only when the current balance is at least its price. It subtracts that price from the balance and adds $x_i$ to the rate. Selling and borrowing are not allowed.

Success means that the current, unspent balance has reached $M$ at some time at most $H$. A strategy stops at its first such time. In particular, success is determined by the balance immediately before a proposed purchase if that balance has already reached $M$. The cumulative amount ever produced is not the target quantity.

We denote this decision problem by $\mathsf{CC}$. All numerators and positive denominators are encoded in binary. We explicitly restrict to rational inputs to make the computational problem precise; these are permitted by the positive-real parameter model in Demaine et al. \[[1](#section-ref-demaine2020cookie)\].

{#lem-target}

**Lemma 2.1** (No purchase at or above the target).  *Every purchase made before the first target hitting time has price strictly less than $M$. Consequently, if $\alpha_i y_i>M$ for every $i$, each type is purchased at most once before success.*

*Proof.* To pay a price $p\ge M$, a strategy must first have a balance at least $p$, and hence at least $M$. Success has therefore already occurred. Such a purchase cannot occur before the first target hitting time. If the second price of type $i$ exceeds $M$, the same is true of every later price, because $\alpha_i>1$. Hence at most its first copy can be purchased before success. ◻

### 2.2 The exact time of a purchase order {#the-exact-time-of-a-purchase-order}

Fix an ordered list of $m$ purchases. Write $p_j>0$ and $u_j>0$ for the price and rate increase of purchase $j$. For repeated types the price is determined by the earlier occurrences of that type in the list. Define

$$
r_j=1+\sum_{h<j}u_h\quad(1\le j\le m+1),
 \qquad
 g_0=0,\qquad
 g_j=g_{j-1}+\frac{p_j}{r_j}\quad(1\le j\le m).
$$

 The times $g_j$ implement the list by buying each item as soon as it can be afforded. The balance is zero immediately after every purchase. We call this the canonical schedule. After its last purchase, it reaches $M$ at time

{#eq-canonical}

$$
T(p,u)=\sum_{j=1}^m\frac{p_j}{r_j}+\frac{M}{r_{m+1}}.
\tag{1}
$$

 For the empty list, the sum is zero, the rate is one, and this expression equals $M$.

{#lem-canonical}

**Lemma 2.2** (Optimality for a fixed order).  *Suppose a strategy makes the given $m$ purchases before reaching balance $M$, then reaches $M$ at time $T$. Its completion time satisfies $T\ge T(p,u)$. If every $p_j<M$, the canonical schedule followed by waiting reaches $M$ for the first time at exactly $T(p,u)$.*

*Proof.* Let $\tau_j$ be the original time of purchase $j$. The amount produced by that time, before subtracting purchase prices, is

$$
\tau_j+\sum_{h<j}u_h(\tau_j-\tau_h).
$$

 Feasibility of purchase $j$ implies that this amount is at least $\sum_{h\le j}p_h$. Collecting the terms containing $\tau_j$ gives

{#eq-cash}

$$
r_j\tau_j\ge \sum_{h\le j}p_h+\sum_{h<j}u_h\tau_h.
\tag{2}
$$

 For the canonical schedule, the balance after purchase $j$ is exactly zero, so the corresponding relation is an equality:

{#eq-cash-greedy}

$$
r_j g_j=\sum_{h\le j}p_h+\sum_{h<j}u_h g_h.
\tag{3}
$$

 We prove $\tau_j\ge g_j$ by induction. For $j=1$, equations [(2)](#section-eq-cash)–[(3)](#section-eq-cash-greedy) and $r_1=1$ give the claim. Suppose it holds for every $h<j$. Since each $u_h$ is positive, the right side of [(2)](#section-eq-cash) is at least the right side of [(3)](#section-eq-cash-greedy). Division by $r_j>0$ gives $\tau_j\ge g_j$.

At the target hitting time, cash-flow feasibility similarly gives

$$
r_{m+1}T\ge M+\sum_{j=1}^m p_j+\sum_{j=1}^m u_j\tau_j
 \ge M+\sum_{j=1}^m p_j+\sum_{j=1}^m u_j g_j.
$$

 The zero balance immediately after the canonical last purchase implies

$$
r_{m+1}g_m=\sum_{j=1}^m p_j+\sum_{j=1}^m u_jg_j.
$$

 It follows that $T\ge g_m+M/r_{m+1}=T(p,u)$. This proves the lower bound. The empty-list case follows directly by waiting at rate one.

Finally, if $p_j<M$ for every $j$, the canonical balance increases from zero to $p_j<M$ before purchase $j$, then returns to zero. It never reaches the target during the purchase phase. During the last wait it increases from zero to $M$, taking exactly $M/r_{m+1}$ time. Thus [(1)](#section-eq-canonical) is its first target hitting time. ◻

This normal form is closely related to the buying-phase/waiting-phase observations in Demaine et al. \[[1](#section-ref-demaine2020cookie)\]. The proof above is included to cover all scheduling details required by the reduction, without presupposing an optimal strategy or a particular choice of purchase times.

## 3. A reduction from Partition {#sec-reduction}

### 3.1 The source problem {#the-source-problem}

The source problem is the standard NP-complete problem Partition \[[2](#section-ref-karp1972)\]: given a list of positive integers, decide whether some sublist has sum equal to half the total. Equal-valued entries remain distinct selectable entries. We may restrict to positive even total $2B$, with integer $B\ge1$. To justify the restriction, an odd-total instance is immediately a no-instance and can be mapped to the fixed even-total no-instance $(1,3)$. An even-total instance is kept unchanged. This is a polynomial-time transformation preserving the answer.

Thus fix positive integers $a_1,\ldots,a_k$ satisfying

{#eq-partition}

$$
\sum_{i=1}^k a_i=2B,\qquad B\in\mathbb{N},\qquad B\ge1.
\tag{4}
$$

 For each subset $I\subseteq\{1,\ldots,k\}$ its sum $\sum_{i\in I}a_i$ is an integer in $[0,2B]$.

### 3.2 All parameters of the constructed instance {#all-parameters-of-the-constructed-instance}

Define

{#eq-parameters}

{#eq-items}

$$
\begin{aligned}
W&=128B^3,& M&=W+B,& \alpha&=2M+1, && \text{(5)} \\
x_i&=\frac{a_i}{W},&
 y_i&=a_i-\frac{a_i^2}{2W}=\frac{a_i(2W-a_i)}{2W},&
 \alpha_i&=\alpha\quad(1\le i\le k). && \text{(6)}
\end{aligned}
$$

 The initial balance and rate are respectively zero and one. Set

{#eq-deadline}

$$
C=M-\frac{B^2}{2W},\qquad
 H=C+\frac{1}{4W}
   =\frac{4WM-2B^2+1}{4W}.
\tag{7}
$$

 The choice $128B^3$ is made only to obtain a simple uniform separation with explicit constants. No limiting operation is part of the construction.

{#lem-valid}

**Lemma 3.1** (Validity and the available purchases).  *The construction gives positive rational gains and prices, a common integer multiplier greater than one, and a positive deadline. Every first price is less than $M$ and every second price exceeds $M$. Any strategy before success therefore buys a subset of the $k$ item types.*

*Proof.* Equation [(4)](#section-eq-partition) gives $1\le a_i\le2B$. Since $B\ge1$,

$$
W=128B^3>2B\ge a_i.
$$

 Consequently $x_i>0$ and

$$
\frac{a_i}{2}<a_i\left(1-\frac{a_i}{2W}\right)=y_i<a_i\le2B<M.
$$

 In particular $y_i>1/2$. Since $\alpha=2M+1$,

$$
\alpha y_i>\frac{2M+1}{2}=M+\frac12>M.
$$

 Lemma [2.1](#section-lem-target) now rules out every repeated purchase. Also $B^2/(2W)=1/(256B)<1$ and $M\ge129$, so both $C$ and $H$ are positive. All displayed parameters are rational, and $\alpha$ is an integer greater than one. ◻

### 3.3 Completion time for an arbitrary ordered subset {#completion-time-for-an-arbitrary-ordered-subset}

Let $i_1,\ldots,i_m$ be any list of distinct indices. Define the selected weights and prefix sums by

$$
b_j=a_{i_j},\qquad s_j=\sum_{h<j}b_h,
 \qquad S=\sum_{j=1}^m b_j.
$$

 Here $s_1=0$, $s_{j+1}=s_j+b_j$, and $s_{m+1}=S$. Before purchase $j$ the rate is $1+s_j/W$. By Lemma [2.2](#section-lem-canonical), the minimum time for this order, including the final wait, is

{#eq-sequence}

$$
T(i_1,\ldots,i_m)=
 \sum_{j=1}^m\frac{b_j-b_j^2/(2W)}{1+s_j/W}
 +\frac{W+B}{1+S/W}.
\tag{8}
$$

 Lemma [3.1](#section-lem-valid) guarantees that every list in [(8)](#section-eq-sequence) is a valid canonical schedule reaching the target for the first time at the stated completion time. Conversely, any successful strategy has a distinct-index list and takes at least the time in [(8)](#section-eq-sequence) for that list.

{#lem-purchase}

**Lemma 3.2** (Exact purchase-time expansion).  For any $b\ge0$, $s\ge0$, and $W>0$,

{#eq-purchase-id}

$$
\frac{b-b^2/(2W)}{1+s/W}
 =b-\frac{bs+b^2/2}{W}
 +\frac{bs^2+b^2s/2}{W(W+s)}.
\tag{9}
$$

 Consequently, the sum of the purchase times in [(8)](#section-eq-sequence) is

{#eq-purchase-sum}

$$
S-\frac{S^2}{2W}+R_p,
 \qquad
 R_p=\sum_{j=1}^m
 \frac{b_js_j(s_j+b_j/2)}{W(W+s_j)},
\tag{10}
$$

 and

{#eq-purchase-error}

$$
0\le R_p\le\frac{S^3}{W^2}\le\frac{8B^3}{W^2}.
\tag{11}
$$

*Proof.* The left side of [(9)](#section-eq-purchase-id) equals $(bW-b^2/2)/(W+s)$. Subtract the first two terms on the right and put the difference over denominator $W(W+s)$. The numerator becomes

$$
\begin{aligned}
&W(bW-b^2/2)-(bW-bs-b^2/2)(W+s)\\
 &\quad=bW^2-b^2W/2
 -\bigl(bW^2-b^2W/2-bs^2-b^2s/2\bigr)\\
 &\quad=bs^2+b^2s/2.
\end{aligned}
$$

 This proves the exact identity.

Summing the identity over $j$ gives a leading term $S$ and a correction

$$
\sum_{j=1}^m\left(b_js_j+\frac{b_j^2}{2}\right)
 =\frac12\sum_{j=1}^m\left((s_j+b_j)^2-s_j^2\right)
 =\frac12\left(s_{m+1}^2-s_1^2\right)
 =\frac{S^2}{2}.
$$

 The middle equality telescopes because $s_j+b_j=s_{j+1}$. This proves [(10)](#section-eq-purchase-sum).

Every summand of $R_p$ is nonnegative. For each $j$, $0\le s_j\le S$ and $s_j+b_j/2\le s_j+b_j\le S$. Also $W(W+s_j)\ge W^2$. Hence

$$
R_p\le\frac{1}{W^2}\sum_{j=1}^m b_jS^2
 =\frac{S^3}{W^2}.
$$

 Finally $S\le2B$ gives the last inequality in [(11)](#section-eq-purchase-error). The empty-list case has $S=R_p=0$ and satisfies all the identities. ◻

{#lem-waiting}

**Lemma 3.3** (Exact waiting-time expansion).  For $0\le S\le2B$ and $W>0$,

{#eq-waiting-id}

$$
\frac{W+B}{1+S/W}
 =W+B-S+\frac{S^2-BS}{W}+R_w,
 \qquad R_w=\frac{S^2(B-S)}{W(W+S)}.
\tag{12}
$$

 Moreover,

{#eq-waiting-error}

$$
|R_w|\le\frac{4B^3}{W^2}.
\tag{13}
$$

*Proof.* First, exact division gives

$$
\frac{W(W+B)}{W+S}=W+B-S+\frac{S(S-B)}{W+S},
$$

 because $(W+B-S)(W+S)=W(W+B)+BS-S^2$. Next,

$$
\frac{S(S-B)}{W+S}-\frac{S(S-B)}{W}
 =-\frac{S^2(S-B)}{W(W+S)}
 =\frac{S^2(B-S)}{W(W+S)}.
$$

 Combining these two equalities gives [(12)](#section-eq-waiting-id). The range $S\in[0,2B]$ implies $S^2\le4B^2$ and $|B-S|\le B$. The denominator is at least $W^2$, proving [(13)](#section-eq-waiting-error). ◻

{#prop-gap}

**Proposition 3.4** (Uniform squared-error representation).  Every ordered subset in the constructed instance satisfies

{#eq-gap}

$$
T(i_1,\ldots,i_m)=C+\frac{(S-B)^2}{2W}+R,
 \qquad |R|\le\frac{3}{32W}.
\tag{14}
$$

 The bound is independent of the number and order of its purchases.

*Proof.* Add [(10)](#section-eq-purchase-sum) and [(12)](#section-eq-waiting-id), and let $R=R_p+R_w$. The resulting leading terms are

$$
\begin{aligned}
&S-\frac{S^2}{2W}+W+B-S+\frac{S^2-BS}{W}\\
 &\quad=W+B+\frac{S^2-2BS}{2W}\\
 &\quad=W+B-\frac{B^2}{2W}+\frac{(S-B)^2}{2W}
 =C+\frac{(S-B)^2}{2W}.
\end{aligned}
$$

 The triangle inequality and Lemmas [3.2](#section-lem-purchase)–[3.3](#section-lem-waiting) give

$$
|R|\le R_p+|R_w|\le\frac{12B^3}{W^2}
 =\frac{12}{128W}=\frac{3}{32W},
$$

 where the equality uses $W=128B^3$. This proves [(14)](#section-eq-gap). ◻

### 3.4 The two directions of the reduction {#the-two-directions-of-the-reduction}

{#prop-equivalence}

**Proposition 3.5** (Exact decision equivalence).  *There is a subset of the source integers with sum $B$ if and only if the constructed process can reach balance $M$ by time $H$.*

*Proof.* Suppose first that $I$ has sum $B$. Buy exactly those item types, in any order, as soon as they are affordable, and then wait. Lemma [3.1](#section-lem-valid) and Lemma [2.2](#section-lem-canonical) show that this is a valid schedule whose first target hitting time is given by [(8)](#section-eq-sequence). Here $S=B$, so Proposition [3.4](#section-prop-gap) gives

$$
T\le C+\frac{3}{32W}
 <C+\frac{8}{32W}=H.
$$

 Thus the constructed instance is a yes-instance.

Conversely, suppose that the source instance has no subset summing to $B$. Consider any successful strategy and its list of purchases before success. By Lemma [3.1](#section-lem-valid), this list has distinct indices. Its sum $S$ is an integer, and by assumption $S\ne B$. Therefore $(S-B)^2\ge1$. By Lemma [2.2](#section-lem-canonical) and Proposition [3.4](#section-prop-gap), the strategy’s completion time is at least

$$
C+\frac{1}{2W}-\frac{3}{32W}
 =C+\frac{13}{32W}
 >C+\frac{8}{32W}=H.
$$

 This argument includes the empty purchase list. Hence no strategy can succeed by the deadline. The two implications establish the equivalence. ◻

The inequalities give a margin of at least $5/(32W)$ on either side of the deadline. Although this number can be small as a real quantity, its rational encoding is short. The reduction uses exact comparisons, so it requires no fixed-precision numerical oracle.

## 4. Encoding length and the NP-complete restriction {#sec-encoding}

### 4.1 Polynomial-time construction {#polynomial-time-construction}

Let $\ell$ be the total binary encoding length of the positive integer list $(a_1,\ldots,a_k)$. Computing its sum and $B$ takes polynomial time. We have $\log B=O(\ell)$ and $k=O(\ell)$. The integers $W=128B^3$ and $M=W+B$ have $O(\log B)$ bits. The multiplier $2M+1$ has the same order of bit length. For each item, $x_i=a_i/W$ and $y_i=a_i(2W-a_i)/(2W)$ have numerators and denominators with $O(\log B)$ bits. The same holds for $H=(4WM-2B^2+1)/(4W)$.

Integer addition, multiplication, and division with remainder on these bit lengths take polynomial time. Fraction reduction, if required by an input convention, can be performed by the Euclidean algorithm in polynomial time. Thus the complete instance has $O(k\log B)$ bits and is produced in time polynomial in $\ell$. Proposition [3.5](#section-prop-equivalence) is therefore a polynomial-time many-one reduction from an NP-complete problem, proving the NP-hardness portion of Theorem [1.1](#section-thm-main).

### 4.2 Short certificates when second prices exceed the target {#short-certificates-when-second-prices-exceed-the-target}

{#prop-np}

**Proposition 4.1** (NP membership of the restriction).  *Consider the language of valid $\mathsf{CC}$ inputs satisfying $y_i<M<\alpha_i y_i$ for every item, with a common integer multiplier greater than one. Deciding whether such an input is a yes-instance is in NP.*

*Proof.* The parameter inequalities and equality of the multipliers are checked by exact rational arithmetic in polynomial time. By Lemma [2.1](#section-lem-target), every successful strategy buys at most $k$ items and has no repeated type. A certificate is its ordered list of distinct indices, of length at most $k$. Its encoding has $O(k\log(k+1))$ bits.

The verifier checks that indices are valid and distinct, computes the rates $r_j=1+\sum_{h<j}x_{i_h}$, then evaluates

$$
\sum_{j=1}^m\frac{y_{i_j}}{r_j}+\frac{M}{r_{m+1}}
$$

 exactly and compares it to $H$. Lemma [2.2](#section-lem-canonical) proves both completeness and soundness of this certificate: a successful original strategy has a canonical one at least as fast, and every accepted list implements a successful canonical schedule.

For completeness, let $L$ be the entire input bit length. A sum of at most $k$ input rationals can be placed over the product of their denominators. This product has at most $O(kL)$ bits, as do its numerator after allowing $O(\log k)$ bits for summation. Dividing an input price by such a rate therefore creates a rational with polynomially many bits. Summing at most $k+1$ such fractions by using their denominator product again produces at most $O(k^2L+k\log k)$ bits. All signs and deadline comparisons can then be checked by integer cross-multiplication on polynomial bit lengths. The verifier is consequently polynomial-time. ◻

Combining this proposition with the reduction proves NP-completeness of the restriction in Theorem [1.1](#section-thm-main). Exact optimization of the full model is NP-hard as well: an algorithm returning an exact optimum value could compare that value with $H$ and decide the constructed instances.

## 5. Ordering and exact optimization of the calibrated family {#sec-dp}

The reduction does not require identifying the fastest order of a selected subset, because its error estimate is uniform over every order. Nevertheless, the constructed family has an exact ordering rule, which gives a pseudopolynomial algorithm for this family.

### 5.1 An adjacent exchange identity {#an-adjacent-exchange-identity}

Write $x(a)=a/W$ and $y(a)=a-a^2/(2W)$. Suppose two consecutive selected weights are $a$ and $b$, and the sum of all previously selected weights is $s$. Let $r=1+s/W$. At this point the balance in the canonical schedule is zero. The difference between the purchase times of the orders $(a,b)$ and $(b,a)$ is

{#eq-swap}

$$
\begin{aligned}
\Delta
 &=\frac{y(a)}{r}+\frac{y(b)}{r+x(a)}
  -\frac{y(b)}{r}-\frac{y(a)}{r+x(b)}\\
 &=\frac{y(a)x(b)}{r(r+x(b))}
  -\frac{y(b)x(a)}{r(r+x(a))}\\
 &=\frac{x(a)x(b)}{r(r+x(a))(r+x(b))}
 \left[r\left(\frac{y(a)}{x(a)}-\frac{y(b)}{x(b)}\right)+y(a)-y(b)\right].
\end{aligned}
\tag{15}
$$

 All factors outside the brackets are positive. In the brackets,

$$
\frac{y(a)}{x(a)}=W-\frac a2,\qquad
 y(a)-y(b)=(a-b)\left(1-\frac{a+b}{2W}\right).
$$

 Substitution yields

{#eq-swap-sign}

$$
\begin{aligned}
&r\left(\frac{b-a}{2}\right)
 +(a-b)\left(1-\frac{a+b}{2W}\right)\\
 &\qquad=(a-b)\left(1-\frac r2-\frac{a+b}{2W}\right)
 =\frac{(a-b)(W-s-a-b)}{2W}.
\end{aligned}
\tag{16}
$$

{#prop-order}

**Proposition 5.1** (Optimal order for every subset).  *For any subset of the calibrated instance, a canonical schedule purchasing its items in nondecreasing order of $a_i$ minimizes the completion time among all orders of that subset.*

*Proof.* For two consecutive selected weights, $s+a+b\le2B<W$. Thus $W-s-a-b>0$, and equations [(15)](#section-eq-swap)–[(16)](#section-eq-swap-sign) show that the sign of $\Delta$ is the sign of $a-b$. If $a>b$, swapping this inverted adjacent pair strictly reduces the time of the two purchases. Both orders finish the pair with balance zero and the same production rate $r+x(a)+x(b)$. The purchased type counts are also the same. Therefore the subsequent canonical purchase costs, rates, and final waiting time are unaffected by the swap. The full completion time decreases by exactly $\Delta>0$.

A finite list can be sorted by repeatedly swapping adjacent inversions. Each such swap decreases its number of inversions by one, so the procedure terminates. The final nondecreasing order takes no longer than the original order. Equal weights have $\Delta=0$, and may be arranged arbitrarily. Lemma [2.2](#section-lem-canonical) already minimizes timing for each order, completing the proof. ◻

### 5.2 Dynamic programming over the selected integer sum {#dynamic-programming-over-the-selected-integer-sum}

Sort the complete integer list so that $a_1\le\cdots\le a_k$. For $0\le j\le k$ and integers $0\le S\le2B$, let $D_j(S)$ be the least total purchase time of a subset of the first $j$ items with sum $S$, purchased in sorted order. If no such subset exists, set $D_j(S)=+\infty$. Initialize

$$
D_0(0)=0,\qquad D_0(S)=+\infty\quad(S>0).
$$

 The recurrence is

{#eq-dp}

$$
D_j(S)=\min\left\{
 D_{j-1}(S),\quad
 D_{j-1}(S-a_j)+\frac{y_j}{1+(S-a_j)/W}
 \right\},
\tag{17}
$$

 where the second term is omitted if $S<a_j$ or its previous state is infinite. After processing all items, the optimal completion time is

{#eq-dp-final}

$$
\operatorname{OPT}=\min_{0\le S\le2B}
 \left(D_k(S)+\frac{M}{1+S/W}\right).
\tag{18}
$$

{#prop-dp}

**Proposition 5.2** (Pseudopolynomial exact algorithm).  *Equations [(17)](#section-eq-dp)–[(18)](#section-eq-dp-final) compute the exact optimum of every calibrated instance in $O(kB)$ rational arithmetic operations after sorting. Every rational involved has polynomial bit length in $k$ and $\log B$.*

*Proof.* We prove the recurrence by induction on $j$. The initialization accounts for the unique empty subset and all impossible nonzero sums. Any subset of the first $j$ items either excludes $j$, contributing the first term, or includes $j$. In the latter case item $j$ can be placed last in sorted order. The preceding subset uses the first $j-1$ items, has sum $S-a_j$, and ends with zero balance at rate $1+(S-a_j)/W$. Its least purchase time is $D_{j-1}(S-a_j)$ by the induction hypothesis. Buying item $j$ next costs precisely the additional time appearing in the second term. Conversely, every finite term of the recurrence constructs a subset of sum $S$. This proves the equality.

For a fixed final sum $S$, the final rate is $1+S/W$, independently of the selected indices. The last wait therefore adds $M/(1+S/W)$. Proposition [5.1](#section-prop-order) guarantees that some globally optimal subset order is sorted. Lemma [3.1](#section-lem-valid) excludes repeats. Minimizing over all sums consequently gives exactly [(18)](#section-eq-dp-final).

There are $(k+1)(2B+1)$ states, each with at most two candidates. Sorting takes $O(k\log k)$ integer comparisons, and the dynamic program takes $O(kB)$ rational operations. A finite state value is always the purchase time of some actual path with at most $k$ purchases. Each purchase-time summand can be written as

$$
\frac{y_i}{1+s/W}=\frac{a_i(2W-a_i)}{2(W+s)},\qquad 0\le s\le2B.
$$

 Its numerator and denominator have $O(\log B)$ bits. A sum of at most $k$ such terms has $O(k\log B+\log k)$ bits using a denominator product. Taking a minimum retains one candidate value rather than adding their denominators together. Thus repeated comparisons do not increase the bound on state bit lengths. Final waits have $O(\log B)$ bits as well. Exact arithmetic and comparisons are therefore polynomial in these bit lengths.

The numerical parameter $B$ can be exponential in the length of its binary encoding. Accordingly, $O(kB)$ rational operations give a pseudopolynomial algorithm, not a polynomial-time algorithm for binary-encoded instances. ◻

One can regard the calibrated family as a decision problem whose input is the integer list defining [(5)](#section-eq-parameters)–[(7)](#section-eq-deadline). It is NP-complete by the reduction and the certificate argument, and it has the pseudopolynomial algorithm above. This gives a precise restricted-family sense in which the construction realizes weak NP-completeness. The full Cookie Clicker problem may have additional sources of difficulty outside this family.

## 6. Hardness with a fixed price multiplier {#sec-fixed}

The preceding proof uses large second prices to exclude repetitions by feasibility alone. We now exclude them by optimality instead. This strengthens the result to any fixed rational multiplier greater than one, including $23/20=1.15$.

{#thm-fixed}

**Theorem 6.1** (Every fixed rational multiplier).  *For every fixed rational number $\alpha>1$, the continuous-time balance-target decision problem with zero initial balance, initial rate one, and $\alpha_i=\alpha$ for all item types is NP-complete. The number of item types is part of the input, and gains and initial prices are positive rationals. In particular, the theorem holds for the fixed multiplier $23/20$.*

### 6.1 Existence of an optimal finite canonical schedule {#existence-of-an-optimal-finite-canonical-schedule}

{#lem-finite}

**Lemma 6.2** (Finite search space for fixed input).  *If each $\alpha_i>1$, an optimal strategy exists and can be chosen canonical, with finitely many purchases before the target.*

*Proof.* For each type $i$, the sequence $y_i\alpha_i^q$ tends to infinity as $q$ tends to infinity. Hence only finitely many of its copies have price less than $M$. Lemma [2.1](#section-lem-target) forbids all other copies before success. The total number of purchases before success is bounded by the sum of these finitely many per-type bounds. There are consequently only finitely many possible purchase lists before success, including the empty list. Each list contains only prices below $M$; by Lemma [2.2](#section-lem-canonical), it has a feasible canonical realization whose completion time is no larger than that of any strategy with that list. The minimum of these finitely many completion times is attained. Since the empty list succeeds in time $M$, at least one such schedule exists and the minimum is finite. ◻

### 6.2 Deleting a purchase that cannot repay its cost {#deleting-a-purchase-that-cannot-repay-its-cost}

{#lem-delete}

**Lemma 6.3** (A necessary inequality for an optimal purchase).  In an optimal canonical schedule, consider a purchase of cost $c$ and rate increase $x$, made after waiting from balance zero at prior rate $r>0$. Then

{#eq-necessary}

$$
c\le\frac{Mx}{r+x}.
\tag{19}
$$

 This statement allows repeated item types and arbitrary multipliers greater than one.

*Proof.* Let $U$ denote the remaining completion time immediately after this purchase. At that moment the balance is zero and the rate is $r+x$. Waiting without any additional purchase would finish in time $M/(r+x)$. If $U$ were larger, replacing the remaining schedule by that wait would improve the entire schedule. Therefore optimality implies

{#eq-suffix-bound}

$$
U\le\frac{M}{r+x}.
\tag{20}
$$

Consider the state just before the waiting interval for the purchase under examination, when balance is zero and rate is $r$. Delete this waiting interval and the purchase, and execute the original list of subsequent purchases canonically from this earlier state. Any later occurrence of the deleted type now has one fewer preceding copy of that type, so its price is divided by that type’s multiplier. All other subsequent prices are unchanged. In particular, no subsequent price increases.

For a later purchase, let $z\ge0$ be the sum of the gains of the subsequent purchases that precede it. Its old rate is $r+x+z$, and its new rate is $r+z$. If its old price is $p$ and its new price is $p'\le p$, its new waiting time satisfies

$$
\begin{aligned}
\frac{p'}{r+z}
 &\le\frac{p}{r+z}
 =\frac{r+x+z}{r+z}\frac{p}{r+x+z}\\
 &=\left(1+\frac{x}{r+z}\right)\frac{p}{r+x+z}
 \le\left(1+\frac xr\right)\frac{p}{r+x+z}.
\end{aligned}
$$

 The final waiting time to reach $M$ satisfies the same inequality, with $p'=p=M$ and $z$ equal to the total subsequent gain. Summing all these termwise bounds shows that the modified suffix takes time at most $(1+x/r)U$.

This modified schedule is feasible. Every price in the original optimal list was below $M$, and the new prices do not increase, so its canonical realization also has no target hit during its purchase phase. Its final wait reaches the target. From the state under comparison, the original schedule takes $c/r+U$, whereas the modified one takes at most $(1+x/r)U$. If $c>xU$, the difference satisfies

$$
\frac cr+U-\left(1+\frac xr\right)U
 =\frac{c-xU}{r}>0,
$$

 contradicting optimality. Thus $c\le xU$. Applying [(20)](#section-eq-suffix-bound) gives [(19)](#section-eq-necessary). ◻

{#cor-no-repeat-opt}

**Corollary 6.4** (A sufficient condition excluding repeated purchases).  *Suppose the initial rate is one and $\alpha_i y_i>Mx_i$ for every item type. Then no optimal canonical schedule contains a repeated item type.*

*Proof.* A repeated purchase of type $i$ has price $c\ge\alpha_i y_i>Mx_i$. Its prior rate is at least one, so $r+x_i>1$ and hence

$$
\frac{Mx_i}{r+x_i}<Mx_i<c.
$$

 This violates Lemma [6.3](#section-lem-delete). An optimal canonical schedule exists by Lemma [6.2](#section-lem-finite), so all optimal canonical schedules have no repeated type. ◻

### 6.3 Reduction for any fixed rational multiplier {#reduction-for-any-fixed-rational-multiplier}

Fix a rational $\alpha>1$. Choose once and for all an integer $K$ such that

{#eq-k}

$$
K\ge128,\qquad K>\frac{1+\alpha}{\alpha-1}.
\tag{21}
$$

 The number $K$ is a constant of this fixed-$\alpha$ problem, independent of the Partition instance. Given [(4)](#section-eq-partition), now set

{#eq-fixed-construction}

$$
W=KB^3,\quad M=W+B,\quad
 x_i=\frac{a_i}{W},\quad y_i=a_i-\frac{a_i^2}{2W},\quad
 \alpha_i=\alpha,
\tag{22}
$$

 and retain $C=M-B^2/(2W)$ and $H=C+1/(4W)$.

The proof of positivity and $y_i<M$ in Lemma [3.1](#section-lem-valid) remains valid because $K\ge128$. To handle repeats, compute

$$
\begin{aligned}
\alpha y_i-Mx_i
 &=\alpha a_i-\frac{\alpha a_i^2}{2W}
   -\frac{(W+B)a_i}{W}\\
 &=\frac{a_i}{W}\left((\alpha-1)W-B-\frac{\alpha a_i}{2}\right)\\
 &\ge\frac{a_i}{W}\left((\alpha-1)KB^3-(1+\alpha)B\right)\\
 &=\frac{a_iB}{W}\left((\alpha-1)KB^2-(1+\alpha)\right)>0.
\end{aligned}
$$

 The first inequality uses $a_i\le2B$, and the strict inequality uses $B\ge1$ and [(21)](#section-eq-k). Corollary [6.4](#section-cor-no-repeat-opt) therefore excludes repeated items from any optimal schedule.

All identities in Lemmas [3.2](#section-lem-purchase)–[3.3](#section-lem-waiting) hold for arbitrary $W>0$. Their combined remainder now satisfies

$$
|R|\le\frac{12B^3}{W^2}=\frac{12}{KW}\le\frac{3}{32W}.
$$

 Thus every canonical distinct-index list still satisfies the same squared-error representation and deadline separation. If a partition exists, its distinct-index schedule finishes before $H$. If no partition exists, every distinct-index canonical schedule takes at least $C+13/(32W)>H$. Since some globally optimal schedule exists and has distinct indices, the global optimum also exceeds $H$ in this case. This proves the decision equivalence even though some nonoptimal schedules may repeat items.

The encoding argument from Section [4](#section-sec-encoding) still applies: $K$ and $\alpha$ are fixed constants, and $\log W=O(\log B)$. Hence the construction is a polynomial-time reduction proving NP-hardness for each fixed $\alpha>1$.

For $\alpha=23/20$, $K=128$ already satisfies [(21)](#section-eq-k), because $(1+\alpha)/(\alpha-1)=43/3<128$. Therefore the original choices $W=128B^3$, $M=W+B$, $x_i$, $y_i$, $C$, and $H$ work unchanged; only the multiplier changes to $23/20$.

### 6.4 Polynomial certificates for a fixed multiplier {#polynomial-certificates-for-a-fixed-multiplier}

{#prop-fixed-np}

**Proposition 6.5** (Fixed-multiplier NP membership).  *For each fixed rational $\alpha>1$, the entire rational-input $\mathsf{CC}$ decision problem with $\alpha_i=\alpha$ is in NP.*

*Proof.* Let $L$ be the total input bit length. Since positive numerator and denominator integers in the input use at most $L$ bits, each positive input rational is strictly between $2^{-L}$ and $2^L$. In particular $M/y_i<2^{2L}$.

Fix an integer $d_\alpha\ge1$ with $\alpha^{d_\alpha}>2$. Such an integer exists because $\alpha>1$, and it is a constant independent of the input. If an item’s exponent $q$ is at least $2Ld_\alpha$, then

$$
\alpha^q\ge(\alpha^{d_\alpha})^{2L}>2^{2L}>\frac{M}{y_i}.
$$

 Its price therefore exceeds $M$ and it cannot be purchased before success. There are at most $2Ld_\alpha$ purchasable copies of each type, and at most $2kLd_\alpha$ purchases in any strategy before success. A certificate consisting of a purchase list thus has polynomial length in the input size.

Given the list, a verifier computes the price of each occurrence by counting previous occurrences, checks that its price is below $M$, computes its preceding rate, and evaluates [(1)](#section-eq-canonical) exactly. Each exponent is $O(L)$, and $\alpha$ has constant bit length, so every rational power $\alpha^q$ has $O(L)$ bits. Each price and rate has polynomial bit length. There are polynomially many such terms, so a denominator-product evaluation of their sum also has polynomial bit length. Integer arithmetic and the final comparison with $H$ take polynomial time.

Lemma [2.2](#section-lem-canonical) shows that the verifier accepts precisely a list whose canonical schedule succeeds by the deadline, and that every yes-instance has an accepted list. This proves membership in NP. For the specific multiplier $23/20$, one may take $d_\alpha=5$, since

$$
23^5=6{,}436{,}343>6{,}400{,}000=2\cdot20^5.
$$

 ◻

NP-hardness from the preceding subsection and Proposition [6.5](#section-prop-fixed-np) complete the proof of Theorem [6.1](#section-thm-fixed). On the calibrated family with fixed multiplier, the no-repeat optimality result also allows the ordering theorem and dynamic program of Section [5](#section-sec-dp) to apply unchanged.

## 7. Conclusion {#conclusion}

The balance-target version of continuous-time incremental production is NP-hard even when the process starts with zero capital and production rate one. The reduction establishes the hardness conjectured in Section 4 of Demaine et al. \[[1](#section-ref-demaine2020cookie)\]. It isolates a subset-selection obstruction: after a quadratic price correction, every purchase order has a completion time that resolves whether the selected integer sum equals a prescribed target. The proof controls the entire rational remainder, including both purchasing and final waiting.

The basic reduction proves NP-completeness on instances whose second prices exceed the target. A deletion argument then gives a stronger classification: for every fixed rational price multiplier greater than one, the full rational-input decision problem is NP-complete. In particular, the multiplier can be fixed at $1.15$. The explicit calibrated family has an exact pseudopolynomial algorithm based on sorting and integer subset sums.

The results do not classify the problem for a fixed number of item types, integer-only rate increases at unit initial rate, or the general fixed-multiplier problem with respect to strong NP-hardness or approximation schemes. The pseudopolynomial algorithm is proved only for the calibrated family. These distinctions specify the limits of the reduction and leave several structural questions for further work.

## Disclosure of AI Assistance {#disclosure-of-ai-assistance}

This work was prepared with extensive assistance from GPT-6 Astra Ultra. The model assisted with literature search and synthesis, evidence extraction and organization, mathematical formulation and proof drafting, manuscript drafting and revision, and LaTeX, tables, figures, and reproducibility scripts. AI-assisted checking and separate agent reviews were also used; these do not constitute independent human peer review or replace expert verification of sources, mathematics, and interpretations. The reported survey statistics are derived from published sources. Responsibility for the final content, claims, citations, and any errors remains with the human authors.

## References {#references}

{#refs}

{#ref-demaine2020cookie}

1. E. D. Demaine, H. Ito, S. Langerman, J. Lynch, M. Rudoy, and K. Xiao. Cookie clicker. *Graphs and Combinatorics*, 36, no. 2, pp. 269–302, 2020. Preprint arXiv:1808.07540, first posted August 22, 2018. The increasing-cost balance-target conjecture is in Section 4. [https://erikdemaine.org/papers/CookieClicker\_GC/paper.pdf](https://erikdemaine.org/papers/CookieClicker_GC/paper.pdf).

{#ref-karp1972}

2. R. M. Karp. Reducibility among combinatorial problems. *Complexity of computer computations*, Plenum Press, pp. 85–103, 1972. [https://doi.org/10.1007/978-1-4684-2001-2\_9](https://doi.org/10.1007/978-1-4684-2001-2_9).
