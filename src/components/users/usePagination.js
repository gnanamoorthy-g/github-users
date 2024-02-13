import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import { auth_token } from "../../env";
const octokit = new Octokit({auth : auth_token });

const RECORDS_PER_PAGE = 40;

export default function usePagination(pageNumber){
  
    const [isLoading,setIsLoading] = useState(false);
    const [users,setUsers] = useState([]);
    const [hasMorePages,setHasMorePages] = useState(true);
    const [nextUrl,setNextUrl] = useState('/users');

    async function getPaginatedData(resourceUrl) {
        const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;
        let pagesRemaining;
        let data = [];
        let nextUrl;
      
        if (hasMorePages) {
          const response = await octokit.request(`GET ${resourceUrl}`, {
            per_page: RECORDS_PER_PAGE,
            headers: {
              "X-GitHub-Api-Version":
                "2022-11-28",
            },
          });
      
          const parsedData = parseData(response.data)
          data = [...users, ...parsedData];
      
          const linkHeader = response.headers.link;
      
          pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);
      
          if (pagesRemaining) {
            nextUrl = linkHeader.match(nextPattern)[0];
          }
          
          setUsers(data);
          setHasMorePages(pagesRemaining);
          setNextUrl(nextUrl);
          setIsLoading(false);
        }
      
        return data;
      }
      
      function parseData(data) {
          if (Array.isArray(data)) {
            return data
          }
        if (!data) {
          return []
        }
      
        delete data.incomplete_results;
        delete data.repository_selection;
        delete data.total_count;
        // Pull out the array of items
        const namespaceKey = Object.keys(data)[0];
        data = data[namespaceKey];
      
        return data;
      }

    useEffect(()=>{
        setIsLoading(true);
        getPaginatedData(nextUrl);
    },[pageNumber])

    return { isLoading, users, hasMorePages}
}