import React, { Component } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default class Picture_upload extends Component {
    constructor(props){
        super(props);

        this.state = {
            images: this.props.images,
            isLoading:false,
            image_raw:'',
            checked:true,
            checkedid:this.props.images[0].id,
            saved:this.props.saved
        }
        this.uploadFile=this.uploadFile.bind(this);
    }

    getFile = async (event) => {
        const file = event.target.files[0];
       
        const base64 = await this.convertBase64(file);
        this.setState({image_raw:base64});
        this.showFile();
    }

    getCheckedid(){
        return this.state.checkedid;
    }

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
    }

    showFile(){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Do you want to upload this?',
            text: "Click upload to upload you image.",
            imageUrl: this.state.image_raw,
            showCancelButton: true,
            confirmButtonText: 'Yes, upload it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                this.uploadFile();
                swalWithBootstrapButtons.fire( 
                    'Uploaded!',
                    'Your file has been uploaded.',
                    'success'
                )
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'No uploado happenedo 🤠',
                'error'
              )
            }
        })
    }

    uploadFile(){
        axios.post("http://"+process.env.REACT_APP_IP+":8000/api/pictures/upload/"+this.props.user.id,{
           img_raw:this.state.image_raw
        });
    }

    deletePic(data){
        if (this.state.images.length === 1){
            Swal.fire('You must have at least 1 image uploaded!')
        }
        else {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post("http://"+process.env.REACT_APP_IP+":8000/api/pictures/delete/"+this.props.user.id,{
                        del_data: data
                    });
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    );
                }
            })
        }
    }

    chooseAsMainPic(userid,picid){
        this.setState({ checkedid:picid});

    }

    sendd(){
        axios.post("https://"+process.env.REACT_APP_IP+":8443/api/pictures/setmain/"+this.props.user.id,{
                pic_id:this.state.checkedid
        })
    }

    render() {
        const {isLoading, images} = this.state;
        if (isLoading){
            return(
                <div className="container">
                    <div className="text-center">
                        <img src="/img/Loading_svg.svg"></img>
                    </div>
                </div>
            );
        }
    
        return (
           
            <div className="container-fluid">
                <div className="">
                {images.map((image,i) => 
                    <div key={image.id} className="card" style={{width:"8rem", display:"inline-block",margin:"1em", border:"none"}}>
                        <img className="card-img-top" onClick={()=>this.chooseAsMainPic(this.props.user.id,image.id)} src={image.route} alt="Card image cap"></img>
                        <a href="/#" onClick={() => this.deletePic(image.route)}><FontAwesomeIcon style={{position: "absolute",bottom:"85%",left:"5%"}} icon={faTimesCircle} color="grey" size="lg" /></a>
                        <FontAwesomeIcon style={{display:(this.state.checked && this.state.checkedid===image.id) ? 'inline-block':'none',position: "absolute",bottom:"85%",right:"5%"}} icon={faCheck} color="green" size="lg" />
                    </div>
                )}
                </div>
                
                <div className="custom-file">
                    <input onChange={this.getFile} id="customFile" name="file" type="file" accept="image/*" className="custom-file-input" ></input>
                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                </div>
            </div>
        )
    }
}
