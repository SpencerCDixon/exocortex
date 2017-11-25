package exo

// WritePageRequest is the JSON body used for creating a new page
type WritePageRequest struct {
	Body string `json:"body"`
}

// PageResponse is the JSON response when querying for the content of a page
type PageResponse struct {
	Body string `json:"body"`
}

// ListResponse is the results of querying for a prefix
type ListResponse struct {
	Prefixes []string `json:"prefixes"`
}

// SearchResponse is a collection of results found when grepping
type SearchResponse struct {
	Results []SearchResult `json:"results"`
}

// SearchRequest is the request object for searching through wiki
type SearchRequest struct {
	Query string `json:"query"`
}

// Page is a page in our wiki
type Page struct {
	Prefix string
	Body   string
	Title  string
}

// SearchResult is a representation of git grepping for content
type SearchResult struct {
	Page       string `json:"page"`
	Content    string `json:"content"`
	LineNumber string `json:"line_number"`
}

// WikiSettings are found in all 'exocortex.json' files.
type WikiSettings struct {
	Server struct {
		Host string `json:"host"`
		Port int    `json:"port"`
	} `json:"server"`
	Repository   string `json:"repository"`
	SyncInterval int    `json:"syncInterval"`
	Title        string `json:"title"`
	Remote       string `json:"remote"`
	Branch       string `json:"branch"`
}

// SettingsUpdateRequest is the struct used to allow users to update their
// wiki settings via the API.  Only a few fields should be allowed to be updated
// via the UI.
type SettingsUpdateRequest struct {
	Title string `json:"title"`
}
