import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";

const SelectImageScan = () => {
    return (
        <div className="justify-content-center align-items-center d-flex">
            <LinkContainer to="/AIScan">
                <Button type="submit" variant="success" className="p-2">
                    Scan Image
                </Button>
            </LinkContainer>
        </div>
    )
}

export default SelectImageScan