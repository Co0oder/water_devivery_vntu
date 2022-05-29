const getWidth = () => {
    return document.documentElement.clientWidth;
}

const countItemsToShow = () => {
    const width = getWidth();
    let count = 1;

    if (width >= 1700) {
        count = 4
    } else if (width >= 1200) {
        count = 3
    } else if (width >= 900) {
        count = 2
    }

    return count;
}

const countReviewsToShow = () => {
    const width = getWidth();
    let count = 1;

    if (width >= 1700) {
        count = 3
    } else if (width >= 900) {
        count = 2
    }

    return count;
}

export {
    getWidth,
    countItemsToShow,
    countReviewsToShow
}
