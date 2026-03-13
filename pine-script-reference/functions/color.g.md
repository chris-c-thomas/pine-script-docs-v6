---
title: "color.g()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_color.g"
category: "Functions"
---

# color.g()

Retrieves the value of the color's green component.

## Syntax & Overloads

```
color.g(color) → const float
```

```
color.g(color) → input float
```

```
color.g(color) → simple float
```

```
color.g(color) → series float
```

## Arguments

**color (const color)** Color.

## Example

```pine
//@version=6
indicator("color.g", overlay=true)
plot(color.g(color.green))
```

## Returns

The value (0 to 255) of the color's green component.
