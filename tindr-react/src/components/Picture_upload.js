import React, { Component } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';

export default class Picture_upload extends Component {
    constructor(props){
        super(props);

        this.state = {
            images: this.props.images,
            isLoading:false,
            image_raw:'',
        }
        this.uploadFile=this.uploadFile.bind(this);
    }

    getFile = async (event) => {
        const file = event.target.files[0];
       
        const base64 = await this.convertBase64(file);
        this.setState({image_raw:base64});
        this.showFile();
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
                    <div key={i} className="card" style={{width:"8rem"}}>
                        <img className="card-img-top" src={image.route} alt="Card image cap"></img>
                    </div>
                )}
                </div>
                <div className="">
                    <input onChange={this.getFile} name="file" type="file" accept="image/*" className="btn btn-success" ></input>
                </div>
            </div>
        )
    }
}
