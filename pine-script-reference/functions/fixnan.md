---
title: "fixnan()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_fixnan"
category: "Functions"
---

# fixnan()

For a given series replaces NaN values with previous nearest non-NaN value.

## Syntax & Overloads

```
fixnan(source) → series color
```

```
fixnan(source) → series int
```

```
fixnan(source) → series float
```

## Arguments

**source (series color)** Source used for the calculation.

## Returns

Series without na gaps.

## See also

- [na()](https://www.tradingview.com/pine-script-reference/v6/#fun_na)
- [na](https://www.tradingview.com/pine-script-reference/v6/#var_na)
- [nz()](https://www.tradingview.com/pine-script-reference/v6/#fun_nz)
