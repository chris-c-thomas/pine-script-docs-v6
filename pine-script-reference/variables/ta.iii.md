---
title: "ta.iii"
source: "https://www.tradingview.com/pine-script-reference/v6/#var_ta.iii"
category: "Variables"
---

# ta.iii

Intraday Intensity Index.

## Type

series float

## Example

```pine
//@version=6
indicator("Intraday Intensity Index")
plot(ta.iii, color=color.yellow)

// the same on pine
f_iii() =>
    (2 * close - high - low) / ((high - low) * volume)

plot(f_iii())
```
