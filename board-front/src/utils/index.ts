// Description : 특정 URL에 대해 파일 객체로 변경해주는 함수
export const convertUrlToFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    // ! 확장자
    const extend = url.split(".").pop();
    const fileName = url.split("/").pop();
    const meta = { type: `image/${extend}` };

    return new File([data], fileName as string, meta);
};

// Description : 모든 URL을 파일 객체로 변경
export const convertUrlsToFiles = async (urls: string[]) => {
    const files: File[] = [];

    for (const url of urls) {
        const file = await convertUrlToFile(url);
        files.push(file);
    }

    return files;
};