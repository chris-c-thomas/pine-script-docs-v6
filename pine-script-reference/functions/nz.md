---
title: "nz()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_nz"
category: "Functions"
---

# nz()

Replaces [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) (undefined) values with either a type-specific default value or a specified replacement.

## Syntax & Overloads

```
nz(source, replacement) → simple color
```

```
nz(source, replacement) → simple int
```

```
nz(source, replacement) → series color
```

```
nz(source, replacement) → series int
```

```
nz(source, replacement) → simple float
```

```
nz(source, replacement) → series float
```

## Arguments

**source (simple color)** The source series to process.

**replacement (simple color)** Optional. The value the function uses to replace [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) values in the `source` series. The default depends on the `source` type: `0` for "int", `0.0` for "float", or `#00000000` for "color".

## Example

```pine
//@version=6
indicator("nz", overlay=true)
plot(nz(ta.sma(close, 100)))
```

## Returns

The value of `source` if it is not `na`. If the value of `source` is `na`, returns zero, or the `replacement` argument when one is used.

## See also

- [na](https://www.tradingview.com/pine-script-reference/v6/#var_na)
- [na()](https://www.tradingview.com/pine-script-reference/v6/#fun_na)
- [fixnan()](https://www.tradingview.com/pine-script-reference/v6/#fun_fixnan)
