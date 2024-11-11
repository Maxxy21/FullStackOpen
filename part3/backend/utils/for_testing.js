const reverse = (string) => {
    return string
        .split('')
        .reverse()
        .join('')
}

const average = array => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return array.length === 0
        ? 0
        : array.reduce(reducer, 0) / array.length
}

const favoriteBlog = (blogs) => {
    const reducer = (prev, current) => {
        return (prev.likes > current.likes)
            ? prev
            : current
    }

    return blogs.reduce(reducer, {})
}



module.exports = {
    reverse,
    average,
    favoriteBlog
}