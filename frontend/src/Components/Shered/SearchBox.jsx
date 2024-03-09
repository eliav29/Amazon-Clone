import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getFilterURI } from '../../utils'

const SearchBox = () => {

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {search} = useLocation();
  useEffect(() => {
    if(!query) return;
    
    //function to take query parameters and return a correct path
    const filterURI = getFilterURI(search, {query: query});
    navigate(filterURI);

  }, [query]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    const filterURI = getFilterURI(search, {query: query});
    navigate(filterURI);
  }


  return (
    <Form onSubmit={submitHandler} className='d-flex me-auto w-50'>
        <InputGroup>
            <FormControl 
            onChange={(e) => setQuery(e.target.value)} 
            type='text' 
            name='q' 
            id='q' 
            placeholder='Search for product' 
            aria-describedby='button-search'>
            </FormControl>
            <Button variant='outline-primary' id='button-search' type='submit'>
                <i className='fa fa-search'></i>
            </Button>
        </InputGroup>
    </Form>
  )
}

export default SearchBox