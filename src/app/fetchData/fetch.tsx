export default function FetchData(apiPath: string, setData: (data:[]) => void)
{
    async function fetchDbData() {
        const response = await fetch(apiPath);
    
        if (response.ok) {
            const data = await response.json();
            setData(data);
        }
    }
    
    fetchDbData();
};

