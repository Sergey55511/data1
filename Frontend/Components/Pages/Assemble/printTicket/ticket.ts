export interface iTocketProps {
    articleId: number;
    model: string;
    length: number;
    width: number;
}

export const getHTMLTicket = (data: iTocketProps) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        
        <body>
            <div
                style="width: 167px; height: 117px; font-family: Arial, Helvetica, sans-serif; font-weight: 700; font-size: 12px;">
                <div style="margin-bottom: 30px;">№ ${data.articleId}</div>
                <div style="margin-bottom: 30px;">${data.model}</div>
                <div style="width: 100%;">
                    <div style="width: 48%; display: inline-block;">${data.length} см.</div>
                    <div style="width: 48%; display: inline-block; text-align: end;">${data.width} гр.</div>
                </div>
            </div>
        </body>
        
        </html>
    `;
};
