### [Code Snippet - Goroutines](/blog/1430352-goroutines)

<time datetime="2015-05-30">30th April 2015</time>

A lovely language feature of Go for running two functions concurrently.

```
package main

import(
    "fmt"
    "time"
)

const Interval int64 = 20;
const Max int = 10;

func f(threadName string) {
    for i := 0; i < Max; i++ {
        fmt.Println(i, "from", threadName)
        time.Sleep(time.Duration(Interval))
    }
}

func main() {
    go f("one")
    go f("two")
    time.Sleep(time.Duration(Interval) * time.Duration(Max))
}
```