function exportClaudeAsHTML() {   // Adapted from printClaude() by ZeroWw
    const centralPart = document.getElementsByClassName('mb-1 mt-1')[1].parentElement.parentElement.parentElement.parentElement;

    if (centralPart) {
        // Get the stylesheets of the current page
        const styles = Array.from(document.styleSheets).map(styleSheet => {
            try {
                return Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('\n');
            } catch (e) {
                console.error('Error occurred while getting stylesheet rules', e);
                return '';
            }
        }).join('\n');
        
        // Add essential CSS variables
        const cssVars = `:root {
        --text-000: 49 6.9% 5.5%;
        --text-100: 49 19.6% 13.3%;
        --text-200: 49 18.8% 20%;
        --text-300: 49 9% 30%;
        --text-400: 49 7% 37%;
        --text-500: 51 7.5% 42.1%;
        --accent-main-000: 15 52.7% 43.9%;
        --accent-main-100: 16 53.8% 47.5%;
        --accent-main-200: 15 55.6% 52.4%;
        --accent-secondary-000: 210 74.2% 42.1%;
        --accent-secondary-100: 210 74.8% 49.8%;
        --accent-secondary-200: 210 74.8% 57%;
        --accent-secondary-900: 210 68.8% 93.3%;
        --accent-pro-000: 251 34.2% 33.3%;
        --accent-pro-100: 251 40% 45.1%;
        --accent-pro-200: 251 61% 72.2%;
        --accent-pro-900: 253 33.3% 91.8%;
        --oncolor-100: 0 0% 100%;
        --bg-000: 60 6.7% 97.1%;
        --bg-100: 50 23.1% 94.9%;
        --bg-200: 49 26.8% 92%;
        --bg-300: 49 25.8% 87.8%;
        --bg-400: 46 28.3% 82%;
        --bg-500: 47 27% 71%;
        --accent-main-900: 15 48% 90.2%;
        --border-100: 48 12.5% 39.2%;
        --border-200: 48 12.5% 39.2%;
        --border-300: 48 12.5% 39.2%;
        --oncolor-200: 60 6.7% 97.1%;
        --oncolor-300: 60 6.7% 97.1%;
        --border-400: 48 12.5% 39.2%;
        --danger-000: 5 74% 28%;
        --danger-100: 5 73.9% 37.7%;
        --danger-200: 5 49.5% 58%;
        --danger-900: 0 40.3% 89%;
        --white: 0 0% 100%;
        --black: 0 0% 0%;
        --kraft: 25 49.7% 66.5%;
        --book-cloth: 15 52.3% 58%;
        --manilla: 40 54% 82.9%;
        }`;
        
        // Create a temporary container to manipulate the content
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = centralPart.innerHTML;
        
        // Remove unwanted elements from the container
        // Remove disclaimer
        const disclaimerElem = tempContainer.getElementsByTagName('a')[0];
        if (disclaimerElem && disclaimerElem.parentElement) {
            disclaimerElem.parentElement.removeChild(disclaimerElem);
        }
        
        // Remove reply to claude
        const replyElems = tempContainer.getElementsByClassName('border-0.5 border-border-300 flex');
        if (replyElems.length > 0) {
            const lastReplyElem = replyElems[replyElems.length - 1];
            if (lastReplyElem && lastReplyElem.parentElement) {
                lastReplyElem.parentElement.removeChild(lastReplyElem);
            }
        }
        
        // Remove copy/paste elements
        Array.from(tempContainer.getElementsByClassName('absolute -bottom-0 -right-1.5 sm:right-2')).forEach(elem => {
            if (elem && elem.parentElement) elem.parentElement.removeChild(elem);
        });
        
        Array.from(tempContainer.getElementsByClassName('absolute -bottom-0 left-[2.3rem]')).forEach(elem => {
            if (elem && elem.parentElement) elem.parentElement.removeChild(elem);
        });
        
        Array.from(tempContainer.getElementsByClassName('sticky bottom-0 mx-auto w-full pt-6')).forEach(elem => {
            if (elem && elem.parentElement) elem.parentElement.removeChild(elem);
        });
        
        // Create the HTML content
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Claude Conversation - ${new Date().toLocaleString()}</title>
            <style>
                ${cssVars}
                ${styles}
                body {
                    margin: 20px;
                    padding: 20px;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }
            </style>
        </head>
        <body>
            ${tempContainer.innerHTML}
        </body>
        </html>`;
        
        // Create a Blob containing the HTML content
        const blob = new Blob([htmlContent], { type: 'text/html' });
        
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        
        // Create a link element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `Claude_Conversation_${new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '')}.html`;
        
        // Append the link to the body, click it, and then remove it
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
        }, 100);
        
    } else {
        console.error('Central part not found!');
    }
}

exportClaudeAsHTML();
