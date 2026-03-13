---
title: "matrix.median()"
source: "https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.median"
category: "Functions"
---

# matrix.median()

The function calculates the [median](https://en.wikipedia.org/wiki/Median) ("the middle" value) of matrix elements.

## Syntax & Overloads

```
matrix.median(id) → series float
```

```
matrix.median(id) → series int
```

## Arguments

**id (matrix\<int/float>)** A matrix object.

## Example

```pine
//@version=6
indicator("`matrix.median()` Example")

// Create a 2x2 matrix.
m = matrix.new<int>(2, 2, na)
// Fill the matrix with values.
matrix.set(m, 0, 0, 1)
matrix.set(m, 0, 1, 2)
matrix.set(m, 1, 0, 3)
matrix.set(m, 1, 1, 4)

// Get the median of the matrix.
x = matrix.median(m)

plot(x, 'Median of the matrix')
```

## Remarks

Note that [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) elements of the matrix are not considered when calculating the median.

## See also

- [matrix.new\<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new<type>)
- [matrix.mode()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.mode)
- [matrix.sort()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.sort)
- [matrix.avg()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.avg)
