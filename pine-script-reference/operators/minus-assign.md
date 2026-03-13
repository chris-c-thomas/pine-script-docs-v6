---
title: "-="
source: "https://www.tradingview.com/pine-script-reference/v6/#op_-="
category: "Operators"
---

# -=

Subtraction assignment. Applicable to numerical expressions.

## Syntax

```
expr1 -= expr2
```

## Example

```pine
//@version=6
indicator("-=")
// Equals to expr1 = expr1 - expr2.
a = 2
b = 3
a -= b
// Result: a = -1.
plot(a)
```

## Returns

Integer or float value, or series of values.
