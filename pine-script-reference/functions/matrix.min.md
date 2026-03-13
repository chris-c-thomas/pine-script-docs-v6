---
title: "matrix.min()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.min"
category: "Functions"
---

# matrix.min()

The function returns the smallest value from the matrix elements.

## Syntax & Overloads

```
matrix.min(id) → series float
```

```
matrix.min(id) → series int
```

## Arguments

**id (matrix\<int/float>)** A matrix object.

## Example

```pine
//@version=6
indicator("`matrix.min()` Example")

// Create a 2x2 matrix.
var m = matrix.new<int>(2, 2, na)
// Fill the matrix with values.
matrix.set(m, 0, 0, 1)
matrix.set(m, 0, 1, 2)
matrix.set(m, 1, 0, 3)
matrix.set(m, 1, 1, 4)

// Get the minimum value from the matrix.
var x = matrix.min(m)

plot(x, 'Matrix minimum value')
```

## Returns

The smallest value from the `id` matrix.

## See also

- [matrix.new\<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new<type>)
- [matrix.max()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.max)
- [matrix.avg()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.avg)
- [matrix.sort()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.sort)
