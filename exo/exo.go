package exo

// WritePageRequest is the JSON body used for creating a new page
type WritePageRequest struct {
	Body string `json:"body"`
}

// PageResponse is the JSON response when querying for the content of a page
type PageResponse struct {
	Body string `json:"body"`
}

// Page is a page in our wiki
type Page struct {
	Prefix string
	Body   string
	Title  string
}
