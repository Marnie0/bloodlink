import { createContext, useContext, useEffect, useState } from 'react';
import dataUrl from '@/pages/donor/requestDetails.json?url';

const MainContext = createContext(null);

const RequestsContext = ({ children }) => {
  const [data, setData] = useState(null);
  const [dataError, setDataError] = useState('');
  const [dataLoading, setDataLoading] = useState(true);

  const getData = async () => {
    setDataLoading(true);
    setDataError('');

    try {
      const req = await fetch(dataUrl);
      if (!req.ok) throw new Error(`HTTP ${req.status}`);
      const res = await req.json();
      setData(res);
    } catch (e) {
      setDataError(e.message);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MainContext.Provider value={{ data, dataError, dataLoading, getData }}>{children}</MainContext.Provider>
  );
};

export const useRequestsData = () => {
  const ctx = useContext(MainContext);
  if (!ctx) throw new Error('useRequestsData must be used inside <RequestsContext>');
  return ctx;
};

export default RequestsContext;
