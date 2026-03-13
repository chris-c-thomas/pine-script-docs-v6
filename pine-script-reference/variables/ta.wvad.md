---
title: "ta.wvad"
source: "https://www.tradingview.com/pine-script-reference/v6/#var_ta.wvad"
category: "Variables"
---

# ta.wvad

Williams Variable Accumulation/Distribution.

## Type

series float

## Example

```pine
//@version=6
indicator("Williams Variable Accumulation/Distribution")
plot(ta.wvad, color=color.yellow)

// the same on pine
f_wvad() =>
    (close - open) / (high - low) * volume

plot(f_wvad())
```
