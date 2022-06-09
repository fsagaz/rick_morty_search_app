import { createContext, useState } from 'react';

export const searchTermContext = createContext();

const SearchTermsProvider = (props) => {
    // this state property (the search term introduced by the user will be now exposed to all the components via the context)
    const [searchTerm, setsearchTerm] = useState('');

    return (
        <searchTermContext.Provider value={[searchTerm, setsearchTerm]}>
            {props.children}
        </searchTermContext.Provider>
    );
};

export default SearchTermsProvider;