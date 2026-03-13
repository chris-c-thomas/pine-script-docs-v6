---
title: "ticker.kagi()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.kagi"
category: "Functions"
---

# ticker.kagi()

Creates a ticker identifier for requesting Kagi values.

## Syntax & Overloads

```
ticker.kagi(symbol, reversal) → simple string
```

```
ticker.kagi(symbol, reversal) → series string
```

```
ticker.kagi(symbol, param, style) → simple string
```

```
ticker.kagi(symbol, param, style) → series string
```

## Arguments

**symbol (simple string)** Symbol ticker identifier.

**reversal (simple int/float)** Reversal amount (absolute price value).

## Example

```pine
//@version=6
indicator("ticker.kagi", overlay=true)
kagi_tickerid = ticker.kagi(syminfo.tickerid, 3)
kagi_close = request.security(kagi_tickerid, timeframe.period, close)
plot(kagi_close)
```

## Returns

String value of ticker id, that can be supplied to [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) function.

## See also

- [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid)
- [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker)
- [request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security)
- [ticker.heikinashi()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.heikinashi)
- [ticker.renko()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.renko)
- [ticker.linebreak()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.linebreak)
- [ticker.pointfigure()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.pointfigure)
