import { useState, useRef, useCallback, useEffect } from "react";
import {
  fetchSuggestions,
  retrievePlace,
  resetSessionToken,
} from "../services/mapboxSearchService";

export default function useMapboxSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    resetSessionToken();
  }, []);

  const updateQuery = useCallback((text) => {
    setQuery(text);
    setSelectedPlace(null);
    setError(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!text || text.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await fetchSuggestions(text);
        setSuggestions(results);
      } catch (err) {
        setError(err.message);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const selectSuggestion = useCallback(async (suggestion) => {
    setLoading(true);
    setError(null);
    try {
      const place = await retrievePlace(suggestion.mapboxId);
      setSelectedPlace(place);
      setSuggestions([]);
      return place;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setSuggestions([]);
    setSelectedPlace(null);
    setError(null);
    setLoading(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    resetSessionToken();
  }, []);

  return {
    query,
    suggestions,
    loading,
    error,
    selectedPlace,
    updateQuery,
    selectSuggestion,
    clearSearch,
  };
}
