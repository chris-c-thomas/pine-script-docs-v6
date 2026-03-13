---
title: "color.r()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_color.r"
category: "Functions"
---

# color.r()

Retrieves the value of the color's red component.

## Syntax & Overloads

```
color.r(color) → const float
```

```
color.r(color) → input float
```

```
color.r(color) → simple float
```

```
color.r(color) → series float
```

## Arguments

**color (const color)** Color.

## Example

```pine
//@version=6
indicator("color.r", overlay=true)
plot(color.r(color.red))
```

## Returns

The value (0 to 255) of the color's red component.
