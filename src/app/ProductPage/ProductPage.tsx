import React, { useState } from "react";  
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";  

export default function ProductPage({ open, onClose, itemid }) {  
    const [isFinished, setIsFinished] = useState(false);  

    return (  
        <Dialog 
            open={open} 
            onClose={onClose} 
            sx={{  
                '& .MuiPaper-root': {  
                    borderRadius: '12px',
                    minWidth: '100px',
                },  
            }}  
        >  
            <DialogTitle id="product-dialog-title">Product Details</DialogTitle>  
            <DialogContent>  
                {/* {selectedItem ? (  
                    <div>  
                        <h2>{selectedItem.name}</h2>  
                        <img src={selectedItem.photo_url} alt={selectedItem.name} />  
                        <p>Price: {selectedItem.discounted_price}</p>  
                        <p>Description: {selectedItem.description}</p>  
                    </div>  
                ) : (  
                    <div>No product selected</div>  
                )}   */}
            </DialogContent>  
            <DialogActions>  
                <Button onClick={onClose} color="primary">  
                    Close  
                </Button>  
            </DialogActions>  
        </Dialog>  
    );  
}  