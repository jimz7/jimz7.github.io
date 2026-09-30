---
title: "A Stationary First-Order Method with a Simplex Cycle"
date: "2026-09-30"
draft: false
---

## Abstract {#abstract}

We construct a stationary linear first-order method with rational coefficients that has a five-cycle on a $1$-strongly convex function with $3$-Lipschitz gradient, yet has no two-dimensional roots-of-unity cycle of any period on that function class. The cycling objective is an explicit quadratic plus squared distance to a polytope. Its five orbit points form a four-dimensional simplex. A necessary interpolation inequality for any polygonal orbit reduces nonexistence to a scalar trigonometric condition, which we exclude by elementary rational interval bounds. The result gives a counterexample to the general stationary-method cycle-reduction conjecture proposed by Goujaud, Taylor, and Dieuleveut in 2023, as written without a quadratic-convergence restriction.

## 1. Introduction {#sec-introduction}

Can all cyclic behavior of a stationary first-order optimization method be detected on a two-dimensional regular polygon? This paper gives a negative answer for the unrestricted class of stationary methods. The example has rational coefficients, uses six stored iterates and one stored gradient, and cycles on the vertices of a four-dimensional simplex. Nevertheless, on the same smooth strongly convex function class, it cannot follow a roots-of-unity cycle of any length, even with a nontrivial jump order around the polygon.

{#the-documented-conjecture}

**The documented conjecture.**

Goujaud, Taylor, and Dieuleveut proposed a general reduction from cyclic trajectories of stationary first-order methods to two-dimensional roots-of-unity trajectories in the concluding section of their 2023 preprint \[[1](#section-ref-gtd2023)\]. The corresponding statement is numbered Conjecture 7.1 in its 2025 revision \[[2](#section-ref-gtd2025)\]. Their conjecture specifies a particular family of interpolating functions. We rule out the required polygonal trajectory on *every* function in the relevant class, so the distinction between that special family and the full class does not affect our obstruction.

Here, “stationary first-order method” means a fixed rule using finitely many previous iterates and their first-order oracle outputs; arbitrary initial histories are allowed. This is the definition given by Goujaud et al. \[[3](#section-ref-gdt2023), Definition 2.1\]. Our rule is linear, uses scalar coefficients independent of the ambient dimension, and preserves translations because its iterate coefficients sum to one.

{#scope-of-the-resolution}

**Scope of the resolution.**

The target is the conjecture quantified over *all* stationary first-order methods. The constructed method is deliberately artificial and is not a recommended optimization algorithm. In fact, we prove that it is not convergent on all strongly convex quadratics. Thus the result does not refute a version restricted to methods that converge on all quadratics, nor the separate conjecture specifically about heavy-ball. It also does not exclude arbitrary planar cycles: it excludes the roots-of-unity shape specified in the target conjecture.

{#research-status}

**Research status.**

This is a candidate counterexample manuscript with a complete, self-contained mathematical argument. A targeted literature check on September 29, 2026 did not locate an earlier resolution of the general stationary-method conjecture. That search is not an exhaustive priority certification. The manuscript has not undergone independent specialist or peer review. Its finite arithmetic checks are exact; they are supplementary to, rather than a replacement for, the proof below.

### 1.1 Main statement {#main-statement}

Let $\mathcal F_{1,3}(E)$ denote the continuously differentiable functions on a finite-dimensional Euclidean space $E$ that are $1$-strongly convex and have $3$-Lipschitz gradient. Define the following stationary method, with six initial points $z_0,\ldots,z_5$:

{#eq-method}

$$
\begin{aligned}
 z_{t+1}={}&\frac15z_t-\frac1{10}z_{t-1}
 +\frac{16}{5}z_{t-2}-\frac32z_{t-3}\\
 &+\frac15z_{t-4}-z_{t-5}
 -2\nabla f(z_{t-2}),\qquad t\geq5.
\end{aligned}
\tag{1}
$$

 The delayed gradient can be evaluated at the indicated stored point or retained from an earlier oracle call. No second-order information is used.

{#def-polygon}

**Definition 1.1** (Roots-of-unity trajectory).  A nonconstant roots-of-unity trajectory is a sequence

{#eq-polygon}

$$
z_t=o+r\bigl(u\cos(t\theta)+v\sin(t\theta)\bigr),
 \qquad \theta=\frac{2\pi q}{K},
\tag{2}
$$

 where $r>0$, $K\geq3$, $1\leq q<K$, $\gcd(q,K)=1$, and $u,v$ are orthonormal. The center $o$, radius, plane, orientation, and starting phase are arbitrary. A phase can be absorbed into $u,v$. We also include $K=2$, defined directly as $z_t=o+r(-1)^t u$ for a unit vector $u$; this allows the two-point case even in dimension one. A noncoprime jump reduces to this definition after replacing $K$ by the actual period.

{#thm-main}

**Theorem 1.2** (A simplex cycle without any roots-of-unity cycle).  *Method [(1)](#section-eq-method) has both of the following properties.*

(i) *There is an explicitly specified $f\in\mathcal F_{1,3}(\mathbb R^5)$ and an initial history for which the method is exactly periodic with minimal period five. The five points span a four-dimensional affine subspace. Restriction to that subspace gives the same example in a four-dimensional Euclidean space.*

(ii) *For every finite-dimensional Euclidean space $E$, every $f\in\mathcal F_{1,3}(E)$, and every $K\geq2$, no roots-of-unity trajectory in Definition [1.1](#section-def-polygon) satisfies [(1)](#section-eq-method).*

The proof separates the existence of the simplex cycle from the exclusion of all polygonal cycles. The latter is an all-period analytic argument, not a search over a finite range of periods.

## 2. Two elementary facts about smooth convex functions {#sec-prelim}

We write $\langle x,y\rangle$ for the Euclidean inner product and $\|x\|^2=\langle x,x\rangle$. Strong convexity with parameter one means

{#eq-strong}

$$
f(x)\geq f(y)+\langle\nabla f(y),x-y\rangle+\frac12\|x-y\|^2
 \quad\text{for every }x,y.
\tag{3}
$$

### 2.1 Projection and a concrete function class {#projection-and-a-concrete-function-class}

{#lem-projection}

**Lemma 2.1** (Squared distance to a compact convex set).  Let $C$ be a nonempty compact convex subset of a Euclidean space. Each $x$ has a unique closest point $P_Cx$ in $C$, characterized by

{#eq-projectioncriterion}

$$
\langle x-P_Cx,w-P_Cx\rangle\leq0\quad\text{for all }w\in C.
\tag{4}
$$

 The function $D(x)=\operatorname{dist}(x,C)^2$ is convex and continuously differentiable, with

{#eq-distancegradient}

$$
\nabla D(x)=2(x-P_Cx).
\tag{5}
$$

 The residual map $x\mapsto x-P_Cx$ is $1$-Lipschitz. Consequently

{#eq-distancefunction}

$$
f_C(x)=\frac12\|x\|^2+\operatorname{dist}(x,C)^2
\tag{6}
$$

 belongs to $\mathcal F_{1,3}$.

*Proof.* Compactness gives existence of a minimizer of $w\mapsto\|x-w\|^2$. If two distinct points $p,q$ both minimized it, their midpoint would be in $C$, and

$$
\left\|x-\frac{p+q}{2}\right\|^2
 =\frac12\|x-p\|^2+\frac12\|x-q\|^2-\frac14\|p-q\|^2
$$

 would be strictly smaller. This proves uniqueness.

For necessity of [(4)](#section-eq-projectioncriterion), fix $w\in C$ and minimize along $p+s(w-p)$ for $0\leq s\leq1$. Its squared distance to $x$ has nonnegative right derivative at $s=0$, namely $-2\langle x-p,w-p\rangle$. Conversely, if the displayed inner product is nonpositive for every $w$, then

$$
\|x-w\|^2=\|x-p\|^2+\|w-p\|^2-2\langle x-p,w-p\rangle
 \geq\|x-p\|^2,
$$

 so $p=P_Cx$.

Apply the criterion to $p=P_Cx$ with $w=q=P_Cy$, and to $q$ with $w=p$. Adding the resulting inequalities gives

{#eq-firm}

$$
\langle x-y,p-q\rangle\geq\|p-q\|^2.
\tag{7}
$$

 In particular $P_C$ is $1$-Lipschitz by Cauchy–Schwarz. If $R(x)=x-P_Cx$, then

$$
\begin{aligned}
\|R(x)-R(y)\|^2
 &=\|x-y\|^2-2\langle x-y,p-q\rangle+\|p-q\|^2\\
 &\leq\|x-y\|^2-\|p-q\|^2
 \leq\|x-y\|^2.
\end{aligned}
$$

For differentiability, using $P_Cx$ as a candidate at $x+h$ gives

$$
D(x+h)-D(x)\leq2\langle R(x),h\rangle+\|h\|^2.
$$

 Using $P_C(x+h)$ as a candidate at $x$ gives the reverse estimate

$$
D(x+h)-D(x)\geq2\langle R(x+h),h\rangle-\|h\|^2
 \geq2\langle R(x),h\rangle-3\|h\|^2,
$$

 where the last step uses the Lipschitz bound for $R$. These inequalities prove [(5)](#section-eq-distancegradient). Continuity of that gradient also follows from the Lipschitz bound.

For $s\in[0,1]$, the point $sP_Cx+(1-s)P_Cy$ is feasible in $C$. Convexity of the squared norm therefore yields

$$
\begin{aligned}
D(sx+(1-s)y)
 &\leq\|sR(x)+(1-s)R(y)\|^2\\
 &\leq sD(x)+(1-s)D(y).
\end{aligned}
$$

 Thus $D$ is convex. Adding $\|x\|^2/2$ makes $f_C$ $1$-strongly convex. Finally

$$
\|\nabla f_C(x)-\nabla f_C(y)\|
 =\|(x-y)+2(R(x)-R(y))\|\leq3\|x-y\|.
$$

 This establishes all assertions. ◻

### 2.2 A necessary interpolation inequality {#a-necessary-interpolation-inequality}

The following standard type of inequality underlies smooth strongly convex interpolation \[[4](#section-ref-thg2017)\]. We include its proof to make the exclusion argument self-contained.

{#lem-interpolation}

**Lemma 2.2**.  For every $f\in\mathcal F_{1,3}$ and every $x,y$, putting $g_x=\nabla f(x)$ and $g_y=\nabla f(y)$ gives

{#eq-interpolation}

$$
f(x)-f(y)\geq\langle g_y,x-y\rangle
 +\frac12\|x-y\|^2
 +\frac14\|g_x-g_y-(x-y)\|^2.
\tag{8}
$$

*Proof.* Integration of the gradient along a segment and the $3$-Lipschitz bound give

$$
\begin{aligned}
f(v)-f(u)-\langle\nabla f(u),v-u\rangle
 &=\int_0^1\langle\nabla f(u+s(v-u))-\nabla f(u),v-u\rangle\,ds\\
 &\leq\int_0^1 3s\|v-u\|^2\,ds
 =\frac32\|v-u\|^2.
\end{aligned}
$$

 Define $h(u)=f(u)-\|u\|^2/2$. Strong convexity implies convexity of $h$, and the preceding upper bound becomes

$$
h(v)\leq h(u)+\langle\nabla h(u),v-u\rangle+\|v-u\|^2.
$$

 Fix $y$ and let $H(u)=h(u)-\langle\nabla h(y),u\rangle$. This is convex and satisfies $\nabla H(y)=0$, so $H(y)\leq H(v)$ for all $v$. At $u=x$, choose $v=x-\nabla H(x)/2$ in the upper bound. It follows that

$$
H(y)\leq H(v)\leq H(x)-\frac14\|\nabla H(x)\|^2.
$$

 Equivalently,

$$
h(x)-h(y)-\langle\nabla h(y),x-y\rangle
 \geq\frac14\|\nabla h(x)-\nabla h(y)\|^2.
$$

 Substitute $h(u)=f(u)-\|u\|^2/2$ and $\nabla h(u)=\nabla f(u)-u$. The quadratic terms on the left simplify to $-\|x-y\|^2/2$, giving [(8)](#section-eq-interpolation). ◻

## 3. The explicit simplex cycle {#sec-construction}

Let $e_0,\ldots,e_4$ be the standard basis of $\mathbb R^5$ and let $\mathbf1=(1,1,1,1,1)^\top$. All subscripts in this section are read modulo five. Set

{#eq-data}

$$
x_i=e_i-\frac15\mathbf1,
 \qquad
 g_i=2x_i+\frac7{20}(x_{i+1}-x_{i-1}),
 \qquad
 v_i=\frac{3x_i-g_i}{2}.
\tag{9}
$$

 Define the compact convex polytope and objective

{#eq-objective}

$$
C=\operatorname{conv}\{v_0,\ldots,v_4\},
 \qquad
 f(x)=\frac12\|x\|^2+\operatorname{dist}(x,C)^2.
\tag{10}
$$

 These formulas specify the function everywhere, without an unspecified extension or numerical interpolation problem. By Lemma [2.1](#section-lem-projection), $f\in\mathcal F_{1,3}(\mathbb R^5)$.

### 3.1 Verification of the prescribed gradients {#verification-of-the-prescribed-gradients}

{#lem-data}

**Lemma 3.1**.  *For each $i$, $P_Cx_i=v_i$ and $\nabla f(x_i)=g_i$.*

*Proof.* We verify the projection criterion at every vertex of $C$. Let $S$ be the orthogonal coordinate permutation with $Se_i=e_{i+1}$. Then $Sx_i=x_{i+1}$, $Sg_i=g_{i+1}$, and $Sv_i=v_{i+1}$. Thus it suffices to verify $\langle x_0-v_0,v_j-v_0\rangle\leq0$ for all $j$.

The vectors, with a common denominator where useful, are

$$
\begin{aligned}
x_0&=\frac15(4,-1,-1,-1,-1),\\
 g_0&=\frac1{20}(32,-1,-8,-8,-15),\\
 v_0&=\frac1{40}(16,-11,-4,-4,3),\\
 x_0-v_0&=\frac1{40}(16,3,-4,-4,-11).
\end{aligned}
$$

 For completeness, the numerator vectors of $40(v_j-v_0)$ are

$$
\begin{array}{c|c|r}
 j & 40(v_j-v_0) & 1600\langle x_0-v_0,v_j-v_0\rangle\\\hline
 0 & (0,0,0,0,0) & 0\\
 1 & (-13,27,-7,0,-7) & -22\\
 2 & (-20,14,20,-7,-7) & -253\\
 3 & (-20,7,7,20,-14) & -253\\
 4 & (-27,7,0,7,13) & -582
\end{array}
$$

 For example, the first nonzero inner product has numerator $16(-13)+3(27)+(-4)(-7)+(-4)0+(-11)(-7)=-22$. The other three numerator sums are, respectively,

$$
\begin{aligned}
16(-20)+3(14)+(-4)(20)+(-4)(-7)+(-11)(-7)&=-253,\\
 16(-20)+3(7)+(-4)(7)+(-4)(20)+(-11)(-14)&=-253,\\
 16(-27)+3(7)+(-4)0+(-4)(7)+(-11)(13)&=-582.
\end{aligned}
$$

 Each is nonpositive. Every $w\in C$ is a convex combination of the $v_j$, so the inequality also holds for $w$ by linearity. Lemma [2.1](#section-lem-projection) gives $P_Cx_0=v_0$, and permutation symmetry gives the result for all $i$.

Using the gradient formula from that lemma,

$$
\nabla f(x_i)=x_i+2(x_i-P_Cx_i)
 =3x_i-2v_i=g_i,
$$

 as claimed. ◻

### 3.2 Exact periodicity and the minimizer {#exact-periodicity-and-the-minimizer}

Initialize [(1)](#section-eq-method) with $z_t=x_{t\bmod5}$ for $0\leq t\leq5$. Suppose the previous six iterates have this form. In the following calculation all $x$ subscripts are modulo five, and Lemma [3.1](#section-lem-data) supplies the gradient:

$$
\begin{aligned}
z_{t+1}
 ={}&\frac15x_t-\frac1{10}x_{t-1}
 +\frac{16}{5}x_{t-2}-\frac32x_{t-3}
 +\frac15x_{t-4}-x_{t-5}\\
 &-2\left(2x_{t-2}+\frac7{20}(x_{t-1}-x_{t-3})\right)\\
 ={}&\frac15x_t-\frac45x_{t-1}-\frac45x_{t-2}
 -\frac45x_{t-3}+\frac15x_{t-4}-x_{t-5}\\
 ={}&-\frac45(x_t+x_{t-1}+x_{t-2}+x_{t-3})+\frac15x_{t+1}\\
 ={}&x_{t+1}.
\end{aligned}
$$

 The third equality uses $x_{t-5}=x_t$ and $x_{t-4}=x_{t+1}$. The last uses $\sum_{i=0}^4x_i=0$. Induction proves the infinite periodic trajectory. The $x_i$ are distinct, hence its minimal period is five.

The four differences $x_i-x_4=e_i-e_4$, $0\leq i\leq3$, are linearly independent. Thus the affine span is

$$
E_0=\{x\in\mathbb R^5:\langle\mathbf1,x\rangle=0\},
$$

 which has dimension four. All $x_i,g_i,v_i$ belong to $E_0$. Restricting $f$ to $E_0$ preserves strong convexity and the gradient Lipschitz bound, and its intrinsic gradients at the cycle points remain $g_i$. An orthonormal identification of $E_0$ with $\mathbb R^4$ therefore gives a four-dimensional example.

Furthermore, $\sum_i v_i=0$, so $0\in C$. Hence $f(0)=0$ and $f(x)\geq\|x\|^2/2$, making zero the unique minimizer. At every cycle point,

$$
\|x_i\|^2=\frac45,
 \qquad
 \|x_i-v_i\|^2=\frac{16^2+3^2+(-4)^2+(-4)^2+(-11)^2}{1600}
 =\frac{209}{800}.
$$

 Consequently,

{#eq-cyclevalue}

$$
f(x_i)-f(0)=\frac25+\frac{209}{800}=\frac{529}{800}>0.
\tag{11}
$$

 The cycle is a genuine failure to approach the minimizer. This proves part (i) of Theorem [1.2](#section-thm-main).

## 4. A necessary condition for a polygonal cycle {#sec-necessary}

For any sequence satisfying the method, write $g_t=\nabla f(z_t)$. Rearranging [(1)](#section-eq-method) with its time index shifted by two gives

{#eq-filter}

$$
g_t=\frac85z_t-\frac1{20}z_{t+1}-\frac34z_{t-1}
 +\frac1{10}(z_{t+2}+z_{t-2})
 -\frac12(z_{t+3}+z_{t-3}).
\tag{12}
$$

 Initially this identity holds for $t\geq3$. If a sequence is periodic and satisfies the recurrence from its prescribed starting history onward, each residue class modulo its period occurs for arbitrarily large $t$. The identity thus holds at every point of that periodic orbit.

Suppose now that a roots-of-unity trajectory in Definition [1.1](#section-def-polygon) satisfies the method. The coefficients on the right side of [(12)](#section-eq-filter) sum to zero, so the center $o$ cancels. For $K\geq3$, identify the plane with $\mathbb C$ by sending $u$ to $1$ and $v$ to $\mathrm i$. For $K=2$, take $\theta=\pi$, $q=1$, and identify $\operatorname{span}\{u\}$ with the real axis; the formulas below apply with $b=0$. After dividing vectors by $r$, put $w_t=e^{\mathrm i t\theta}$. The prescribed gradient is then $m(\theta)w_t$, where

{#eq-symbol}

{#eq-a}

{#eq-b}

$$
\begin{aligned}
m(\theta)
 &=\frac85-\frac1{20}e^{\mathrm i\theta}-\frac34e^{-\mathrm i\theta}
 +\frac1{10}(e^{2\mathrm i\theta}+e^{-2\mathrm i\theta})
 -\frac12(e^{3\mathrm i\theta}+e^{-3\mathrm i\theta}) && \\
&=a(\theta)+\mathrm i b(\theta), && \text{(13)} \\
a(\theta)&=\frac85-\frac45\cos\theta+\frac15\cos(2\theta)-\cos(3\theta), && \text{(14)} \\
b(\theta)&=\frac7{10}\sin\theta. && \text{(15)}
\end{aligned}
$$

 In particular, the recurrence forces the gradient to lie in the plane; there is no unaccounted orthogonal component.

{#lem-polygon}

**Lemma 4.1** (Polygon obstruction).  If a roots-of-unity trajectory with period $K$ and jump angle $\theta$ satisfies the method on some $f\in\mathcal F_{1,3}$, then

{#eq-obstruction}

$$
A(\theta)+|b(\theta)|\cot\!\left(\frac\pi K\right)\leq0,
 \qquad
 A(\theta)=\frac{(a(\theta)-1)(a(\theta)-3)+b(\theta)^2}{2}.
\tag{16}
$$

 For $K=2$, the cotangent is zero.

*Proof.* Fix an integer shift $j$, and apply Lemma [2.2](#section-lem-interpolation) to $x=z_{t+j}$ and $y=z_t$. Let $\phi=j\theta$, $a=a(\theta)$, and $b=b(\theta)$. Rotation invariance of inner products gives

$$
\begin{aligned}
r^{-2}\langle g_t,z_{t+j}-z_t\rangle
 &=\operatorname{Re}\!\left((a-\mathrm i b)(e^{\mathrm i\phi}-1)\right)
 =a(\cos\phi-1)+b\sin\phi,\\
 r^{-2}\|z_{t+j}-z_t\|^2&=2(1-\cos\phi),\\
 r^{-2}\|g_{t+j}-g_t-(z_{t+j}-z_t)\|^2
 &=\bigl((a-1)^2+b^2\bigr)2(1-\cos\phi).
\end{aligned}
$$

 Substitution into the interpolation inequality gives

$$
f(z_{t+j})-f(z_t)
 \geq r^2\bigl(A(1-\cos\phi)+b\sin\phi\bigr),
$$

 because

$$
-a+1+\frac{(a-1)^2+b^2}{2}
 =\frac{a^2-4a+3+b^2}{2}=A.
$$

 Sum over $t=0,\ldots,K-1$. The function values cancel by periodicity. Since $Kr^2>0$,

{#eq-everyshift}

$$
A(1-\cos(j\theta))+b\sin(j\theta)\leq0
 \quad\text{for every integer }j.
\tag{17}
$$

 This argument does *not* assume that the function values on the orbit are equal.

Since $q$ is coprime to $K$, there are shifts giving $j\theta=2\pi/K$ and $j\theta=-2\pi/K$ modulo $2\pi$. Take the stronger of the two inequalities [(17)](#section-eq-everyshift). For $K\geq3$, divide by $1-\cos(2\pi/K)>0$ and use

$$
\frac{\sin(2\pi/K)}{1-\cos(2\pi/K)}=\cot(\pi/K).
$$

 This gives [(16)](#section-eq-obstruction). For $K=2$, take $j=1$ directly in [(17)](#section-eq-everyshift); its sine is zero and its cosine is $-1$, yielding $2A\leq0$. ◻

## 5. Excluding every period {#sec-exclusion}

Write $c=\cos\theta$ and $s=|\sin\theta|=\sqrt{1-c^2}$. The triple-angle and double-angle identities turn [(14)](#section-eq-a) into the polynomial

{#eq-polynomial}

$$
a(c)=-4c^3+\frac25c^2+\frac{11}{5}c+\frac75
 =(1-c)\left(4c^2+\frac{18}{5}c+\frac75\right),
 \qquad |b|=\frac7{10}s.
\tag{18}
$$

{#lem-barrier}

**Lemma 5.1** (Uniform scalar barrier).  For every $c\in[-1,1]$, with $a=a(c)$ as in [(18)](#section-eq-polynomial),

{#eq-barrier}

$$
\frac{(a-1)(a-3)+(49/100)(1-c^2)}2
 +\frac43\frac7{10}\sqrt{1-c^2}>0.
\tag{19}
$$

*Proof.* Twice the left side equals

{#eq-barrier-function}

$$
B(c)=(a(c)-2)^2+\frac{49}{100}s^2+\frac{28}{15}s-1.
\tag{20}
$$

 We give rational bounds on intervals covering $[-1,1]$.

First, $a'(c)=-12c^2+\frac45c+\frac{11}{5}$ is strictly negative on both $[-1,-7/8]$ and $[7/8,1]$: indeed, on either interval

$$
a'(c)\leq-12\frac{49}{64}+\frac45+\frac{11}{5}
 =-\frac{99}{16}<0.
$$

 Direct evaluation gives

{#eq-endpoints}

$$
a(7/8)=\frac{609}{640}<1,\quad
 a(-7/8)=\frac{315}{128}>\frac{49}{20},\quad
 a(-9/10)=\frac{133}{50},\quad
 a(-19/20)=\frac{6201}{2000}>3.
\tag{21}
$$

If $7/8\leq c\leq1$, monotonicity gives $a(c)\leq609/640<1$. Hence $(a-1)(a-3)>0$, proving [(19)](#section-eq-barrier) on this interval. If $-1\leq c\leq-19/20$, monotonicity instead gives $a(c)\geq6201/2000>3$, which gives the same conclusion.

For $-7/8\leq c\leq7/8$, we have $s^2\geq15/64>144/625$, hence $s>12/25$. Dropping the nonnegative square in [(20)](#section-eq-barrier-function), and using that its remaining terms increase with $s\geq0$, yields

$$
B(c)\geq\frac{49}{100}\left(\frac{12}{25}\right)^2
 +\frac{28}{15}\frac{12}{25}-1
 =\frac{139}{15625}>0.
$$

For $-19/20\leq c\leq-9/10$, monotonicity gives $a(c)\geq133/50$, so $a(c)-2\geq33/50>0$. Also $s^2\geq39/400>9/100$, hence $s>3/10$. Therefore

$$
B(c)\geq\left(\frac{33}{50}\right)^2
 +\frac{49}{100}\left(\frac3{10}\right)^2
 +\frac{28}{15}\frac3{10}-1
 =\frac{397}{10000}>0.
$$

Finally, for $-9/10\leq c\leq-7/8$, we have $a(c)\geq315/128>49/20$, giving $a(c)-2>9/20$. Also $s^2\geq19/100>4/25$, hence $s>2/5$. Thus

$$
B(c)\geq\left(\frac9{20}\right)^2
 +\frac{49}{100}\left(\frac25\right)^2
 +\frac{28}{15}\frac25-1
 =\frac{827}{30000}>0.
$$

 The five intervals cover the entire domain, completing the proof. ◻

*Proof of Theorem [1.2](#section-thm-main), part (ii).* For $K\geq5$, monotonicity of cotangent on $(0,\pi/2]$ gives

$$
\cot(\pi/K)\geq\cot(\pi/5)>\frac43.
$$

 For an exact verification of the last inequality, set $\zeta=e^{2\pi\mathrm i/5}$ and $d=\cos(2\pi/5)>0$. The geometric sum $1+\zeta+\zeta^2+\zeta^3+\zeta^4=0$ gives, upon taking real parts,

$$
1+2d+2(2d^2-1)=0.
$$

 Thus $4d^2+2d-1=0$, and positivity selects $d=(\sqrt5-1)/4$. The half-angle identity then gives

$$
\cot^2(\pi/5)=\frac{1+d}{1-d}
 =\frac{3+\sqrt5}{5-\sqrt5}=1+\frac2{\sqrt5}>\frac{16}{9};
$$

 the strict comparison follows from $18>7\sqrt5$, whose square is $324>245$. It now follows from Lemma [5.1](#section-lem-barrier) that

$$
A(\theta)+|b(\theta)|\cot(\pi/K)
 \geq A(\theta)+\frac43|b(\theta)|>0,
$$

 contradicting the necessary condition [(16)](#section-eq-obstruction).

It remains to check $K=2,3,4$. For $K=2$, $c=-1$, $a=18/5$, and $b=0$, giving

$$
A=\frac{(13/5)(3/5)}2=\frac{39}{50}>0.
$$

 For $K=3$, either coprime jump has $c=-1/2$ and $a=9/10<1$. Thus $(a-1)(a-3)>0$, and $A>0$, contradicting [(16)](#section-eq-obstruction). For $K=4$, the coprime jumps have $c=0$, $a=7/5$, and $|b|=7/10$. Consequently

$$
A=\frac{(2/5)(-8/5)+49/100}{2}=-\frac3{40},
 \qquad
 A+|b|\cot(\pi/4)=-\frac3{40}+\frac7{10}=\frac58>0.
$$

 Every possible period is excluded. Together with the construction, this proves Theorem [1.2](#section-thm-main). ◻

## 6. What the example establishes, and what it does not {#sec-scope}

The same fixed, dimension-independent recurrence has a cyclic trajectory in $\mathcal F_{1,3}$ and has no roots-of-unity trajectory in that class. Its six iterate coefficients sum to

$$
\frac15-\frac1{10}+\frac{16}{5}-\frac32+\frac15-1=1.
$$

 It is therefore a stationary first-order rule in the stated sense, with the usual translation consistency of scalar linear methods. The existence and exclusion claims use the same smoothness and strong convexity parameters. This disproves the general implication in the documented conjecture as written.

The example also identifies a limitation of trying to replace a cycle by one of its individual Fourier components. The simplex has two nontrivial real Fourier planes. Their combined interpolation constraints can hold even when neither isolated circular component is admissible. Symmetry of a feasible cycle therefore need not provide a feasible single-frequency cycle. This is an interpretation of the construction, not an additional premise in the proof.

### 6.1 Quadratic instability is a genuine limitation {#quadratic-instability-is-a-genuine-limitation}

{#prop-quadratic}

**Proposition 6.1**.  *For every $\lambda\in[1,3]$, method [(1)](#section-eq-method) applied to $f(x)=\lambda x^2/2$ in one dimension has an initialization that does not converge to the minimizer.*

*Proof.* The scalar recurrence has characteristic polynomial

{#eq-characteristic}

$$
P_\lambda(z)=z^6-\frac15z^5+\frac1{10}z^4
 +\left(2\lambda-\frac{16}{5}\right)z^3
 +\frac32z^2-\frac15z+1.
\tag{22}
$$

 For $z=e^{\mathrm i\theta}$, rearrangement of this polynomial is exactly the filter identity [(12)](#section-eq-filter); since $z\neq0$,

$$
P_\lambda(e^{\mathrm i\theta})=0
 \quad\Longleftrightarrow\quad m(\theta)=\lambda.
$$

 But $\operatorname{Im}m(\theta)=\frac7{10}\sin\theta$, so a real value requires $\theta=0$ or $\pi$ modulo $2\pi$. At these two angles, $m(0)=0$ and $m(\pi)=18/5$, neither of which belongs to $[1,3]$. Thus $P_\lambda$ has no root on the unit circle.

The polynomial is monic of degree six and has constant term one. The product of its six roots is one, and hence the product of their moduli is one. They cannot all have modulus less than one. Since none has modulus one, at least one root $z$ has $|z|>1$. The complex sequence $z^t$ satisfies the recurrence. Its real and imaginary parts are real solutions; at least one of them is unbounded, because otherwise $|z^t|$ would remain bounded. Initialize with the first six terms of that real solution. The resulting iterates do not converge to zero. ◻

Accordingly, the theorem makes no claim about the conjecture after imposing convergence on every quadratic in the class. Nor does it settle the heavy-ball-specific reduction, which restricts the recurrence to two stored iterates and a current gradient. These distinctions are essential to the interpretation of the result.

## 7. Conclusion {#sec-conclusion}

A six-memory stationary first-order rule can cycle on a smooth strongly convex objective while admitting no two-dimensional roots-of-unity cycle of any period in the same function class. The objective is an explicit quadratic plus a squared distance to a polytope, the cycle data and method coefficients are rational, and the exclusion proof uses an elementary uniform scalar inequality. The resulting counterexample addresses the unrestricted general stationary-method conjecture. Determining whether an analogous reduction holds under additional algorithmic stability assumptions is a separate question.

## Disclosure of AI Assistance {#disclosure-of-ai-assistance}

This work was prepared with extensive assistance from GPT-6 Astra Ultra. The model assisted with literature search and synthesis, evidence extraction and organization, mathematical formulation and proof drafting, manuscript drafting and revision, and LaTeX, tables, figures, and reproducibility scripts. AI-assisted checking and separate agent reviews were also used; these do not constitute independent human peer review or replace expert verification of sources, mathematics, and interpretations. The reported survey statistics are derived from published sources. Responsibility for the final content, claims, citations, and any errors remains with the human authors.

## References {#references}

{#refs}

{#ref-gtd2023}

1. B. Goujaud, A. Taylor, and A. Dieuleveut. Provable non-accelerations of the heavy-ball method. 2023. arXiv:2307.11291v1, July 21, 2023. [https://arxiv.org/abs/2307.11291v1](https://arxiv.org/abs/2307.11291v1).

{#ref-gtd2025}

2. B. Goujaud, A. Taylor, and A. Dieuleveut. Provable non-accelerations of the heavy-ball method. 2025. arXiv:2307.11291v2, October 9, 2025. Conjecture 7.1. [https://arxiv.org/abs/2307.11291v2](https://arxiv.org/abs/2307.11291v2).

{#ref-gdt2023}

3. B. Goujaud, A. Dieuleveut, and A. Taylor. Counter-examples in first-order optimization: A constructive approach. 2023. arXiv:2303.10503, revised January 10, 2025. Definition 2.1. [https://arxiv.org/abs/2303.10503](https://arxiv.org/abs/2303.10503).

{#ref-thg2017}

4. A. B. Taylor, J. M. Hendrickx, and F. Glineur. Smooth strongly convex interpolation and exact worst-case performance of first-order methods. *Mathematical Programming*, 161, pp. 307–345, 2017. [https://doi.org/10.1007/s10107-016-1009-3](https://doi.org/10.1007/s10107-016-1009-3).

## Appendix A. Exact arithmetic and reproducibility {#app-verification}

The accompanying `verify.py` uses only Python’s standard library and rational arithmetic. It checks every projection inequality, every interpolation inequality for the five points, the recurrence on each residue class, the sum of the method coefficients, the value at each cycle point, and the rational constants in the interval proof. An explicit failure raises an exception even when Python assertions are disabled. No floating-point tolerance is used.

For an additional check independent of the projection table, define

$$
R_{ij}=\langle g_j,x_i-x_j\rangle+\frac12\|x_i-x_j\|^2
 +\frac14\|(g_i-g_j)-(x_i-x_j)\|^2.
$$

 All cycle function values equal $529/800$, so Lemma [2.2](#section-lem-interpolation) requires $R_{ij}\leq0$. With $j=0$ and $i=k$, the exact quantities are

| $k$ | $\langle g_0,x_k-x_0\rangle$ | $\Vert (g_k-g_0)-(x_k-x_0)\Vert ^2$ | $-R_{k0}$ |
| --- | --- | --- | --- |
| 1 | $-33/20$ | $249/100$ | $11/400$ |
| 2 | $-2$ | $547/200$ | $253/800$ |
| 3 | $-2$ | $547/200$ | $253/800$ |
| 4 | $-47/20$ | $249/100$ | $291/400$ |

In each row $\|x_k-x_0\|^2=2$, so the fourth column is obtained by negating the sum of the second column, one, and one quarter of the third column. Cyclic coordinate permutation supplies all ordered pairs. Strict positivity of every off-diagonal slack also shows that existence of the cycle is not based on a zero-margin numerical interpolation test.

The code checks finite arithmetic only. The proof that *all* periods are excluded is the interval argument in Lemma [5.1](#section-lem-barrier) together with the necessary condition in Lemma [4.1](#section-lem-polygon); finite tests of selected periods would not establish that claim.
