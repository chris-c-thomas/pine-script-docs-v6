---
title: "math.min()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_math.min"
category: "Functions"
---

# math.min()

Returns the smallest of multiple values.

## Syntax & Overloads

```
math.min(number0, number1, ...) → const int
```

```
math.min(number0, number1, ...) → const float
```

```
math.min(number0, number1, ...) → input int
```

```
math.min(number0, number1, ...) → simple int
```

```
math.min(number0, number1, ...) → input float
```

```
math.min(number0, number1, ...) → series int
```

```
math.min(number0, number1, ...) → simple float
```

```
math.min(number0, number1, ...) → series float
```

## Arguments

**number0, number1, ... (const int)** A sequence of numbers to use in the calculation.

## Example

```pine
//@version=6
indicator("math.min", overlay=true)
plot(math.min(close, open))
plot(math.min(close, math.min(open, 42)))
```

## Returns

The smallest of multiple given values.

## See also

- [math.max()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.max)
