---
title: "color.t()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_color.t"
category: "Functions"
---

# color.t()

Retrieves the color's transparency.

## Syntax & Overloads

```
color.t(color) → const float
```

```
color.t(color) → input float
```

```
color.t(color) → simple float
```

```
color.t(color) → series float
```

## Arguments

**color (const color)** Color.

## Example

```pine
//@version=6
indicator("color.t", overlay=true)
plot(color.t(color.new(color.red, 50)))
```

## Returns

The value (0-100) of the color's transparency.
