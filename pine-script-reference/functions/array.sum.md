---
title: "array.sum()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_array.sum"
category: "Functions"
---

# array.sum()

The function returns the sum of an array's elements.

## Syntax & Overloads

```
array.sum(id) → series float
```

```
array.sum(id) → series int
```

## Arguments

**id (array\<int/float>)** An array object.

## Example

```pine
//@version=6
indicator("array.sum example")
a = array.new_float(0)
for i = 0 to 9
    array.push(a, close[i])
plot(array.sum(a))
```

## Returns

The sum of the array's elements.

## Remarks

Returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the `id` array is empty.

## See also

- [array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float)
- [array.max()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.max)
- [array.min()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.min)
