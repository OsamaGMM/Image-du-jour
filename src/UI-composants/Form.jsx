import React from 'react';
import * as Form from '@radix-ui/react-form';
import './Form.scss';

function FormComm ({handleSubmit,commText,setCommText}){

    return(
        <Form.Root className="FormRoot" onSubmit={handleSubmit}>

        <Form.Field className="FormField" name="question">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end' }}>
            <Form.Message className="FormMessage" match="valueMissing">
              Commentaire vide!
            </Form.Message>
          </div>
    
          <Form.Control asChild>
            <textarea
             value={commText}
             onChange={(e) => setCommText(e.target.value)}
             className="Textarea" 
             required 
             placeholder='Ajoutez un commentaire'/>
          </Form.Control>
        </Form.Field>
    
        <Form.Submit asChild>
          <button className="Button">
            Commenter
          </button>
        </Form.Submit>
    
    
      </Form.Root>

    )

}


export default FormComm;