---
title: "color.b()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_color.b"
category: "Functions"
---

# color.b()

Retrieves the value of the color's blue component.

## Syntax & Overloads

```
color.b(color) → const float
```

```
color.b(color) → input float
```

```
color.b(color) → simple float
```

```
color.b(color) → series float
```

## Arguments

**color (const color)** Color.

## Example

```pine
//@version=6
indicator("color.b", overlay=true)
plot(color.b(color.blue))
```

## Returns

The value (0 to 255) of the color's blue component.
