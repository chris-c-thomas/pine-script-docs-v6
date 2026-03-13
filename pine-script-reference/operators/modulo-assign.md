---
title: "%="
source: "https://www.tradingview.com/pine-script-reference/v6/#op_%="
category: "Operators"
---

# %=

Modulo assignment. Applicable to numerical expressions.

## Syntax

```
expr1 %= expr2
```

## Example

```pine
//@version=6
indicator("%=")
// Equals to expr1 = expr1 % expr2.
a = 3
b = 3
a %= b
// Result: a = 0.
plot(a)
```

## Returns

Integer or float value, or series of values.
