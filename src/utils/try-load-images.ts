const loadImage = (src: string): Promise<void> =>
    new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve();
        image.onerror = () => reject();

        image.src = src;
    });

const tryLoadImages = (
    srcList: string[]
): Promise<PromiseSettledResult<void>[]> =>
    Promise.allSettled(srcList.map(loadImage));

export { tryLoadImages };
