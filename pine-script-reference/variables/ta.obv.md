---
title: "ta.obv"
source: "https://www.tradingview.com/pine-script-reference/v6/#var_ta.obv"
category: "Variables"
---

# ta.obv

On Balance Volume.

## Type

series float

## Example

```pine
//@version=6
indicator("On Balance Volume")
plot(ta.obv, color=color.yellow)

// the same on pine
f_obv() =>
    ta.cum(math.sign(ta.change(close)) * volume)

plot(f_obv())
```
