import React,  {Component} from 'react';
import  {Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextArea from '../../../app/common/form/TextArea';

class EventDetailedChatForm extends Component {

  handleCommentSubmit = (values) => {
    const { addEventComment, reset, eventId, closeForm, parentId} = this.props;
    //reset property from redux-form is available because we connected our redux form with the component
    addEventComment(eventId, values, parentId);
    reset();
    if (parentId !== 0) {
        closeForm();
      }
    }

  render() {
    return (
        <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
          <Field name="comment" type="text" component={TextArea} rows={2}/>
          <Button content="Add Reply" labelPosition="left" icon="edit" primary />
        </Form>
    )
  }
}

export default reduxForm({Fields: "comment"})(EventDetailedChatForm);
