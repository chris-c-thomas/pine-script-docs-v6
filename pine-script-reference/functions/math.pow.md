---
title: "math.pow()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_math.pow"
category: "Functions"
---

# math.pow()

Mathematical power function.

## Syntax & Overloads

```
math.pow(base, exponent) → const float
```

```
math.pow(base, exponent) → input float
```

```
math.pow(base, exponent) → simple float
```

```
math.pow(base, exponent) → series float
```

## Arguments

**base (const int/float)** Specify the base to use.

**exponent (const int/float)** Specifies the exponent.

## Example

```pine
//@version=6
indicator("math.pow", overlay=true)
plot(math.pow(close, 2))
```

## Returns

`base` raised to the power of `exponent`. If `base` is a series, it is calculated elementwise.

## See also

- [math.sqrt()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.sqrt)
- [math.exp()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.exp)
