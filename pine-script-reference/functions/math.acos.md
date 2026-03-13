---
title: "math.acos()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_math.acos"
category: "Functions"
---

# math.acos()

The acos function returns the arccosine (in radians) of number such that cos(acos(y)) = y for y in range \[-1, 1].

## Syntax & Overloads

```
math.acos(angle) → const float
```

```
math.acos(angle) → input float
```

```
math.acos(angle) → simple float
```

```
math.acos(angle) → series float
```

## Arguments

**angle (const int/float)** The value, in radians, to use in the calculation.

## Returns

The arc cosine of a value; the returned angle is in the range \[0, Pi], or [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if y is outside of range \[-1, 1].
