import { useEffect } from 'react'

export default function useLogging(alt, value) {
  useEffect(() => {
    console.log('====================================');
    console.log('CHANGE');
    if (alt) {
      console.log(alt);
    } else {
      console.log(value)
    }
    // console.log('====================================');
    
    return () => {
        // console.log('====================================');
        console.log('UNMOUNT');
        console.log('====================================');
    }
  }, [value]);
}