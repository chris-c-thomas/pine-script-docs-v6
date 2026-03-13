---
title: "math.max()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_math.max"
category: "Functions"
---

# math.max()

Returns the greatest of multiple values.

## Syntax & Overloads

```
math.max(number0, number1, ...) → const int
```

```
math.max(number0, number1, ...) → const float
```

```
math.max(number0, number1, ...) → input int
```

```
math.max(number0, number1, ...) → simple int
```

```
math.max(number0, number1, ...) → input float
```

```
math.max(number0, number1, ...) → series int
```

```
math.max(number0, number1, ...) → simple float
```

```
math.max(number0, number1, ...) → series float
```

## Arguments

**number0, number1, ... (const int)** A sequence of numbers to use in the calculation.

## Example

```pine
//@version=6
indicator("math.max", overlay=true)
plot(math.max(close, open))
plot(math.max(close, math.max(open, 42)))
```

## Returns

The greatest of multiple given values.

## See also

- [math.min()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.min)
