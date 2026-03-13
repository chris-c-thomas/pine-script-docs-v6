---
title: "math.round_to_mintick()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_math.round_to_mintick"
category: "Functions"
---

# math.round_to_mintick()

Returns the value rounded to the symbol's mintick, i.e. the nearest value that can be divided by [syminfo.mintick](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.mintick), without the remainder, with ties rounding up.

## Syntax & Overloads

```
math.round_to_mintick(number) → simple float
```

```
math.round_to_mintick(number) → series float
```

## Arguments

**number (simple int/float)** The value to be rounded.

## Returns

The `number` rounded to tick precision.

## Remarks

Note that for 'na' values function returns 'na'.

## See also

- [math.ceil()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.ceil)
- [math.floor()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.floor)
