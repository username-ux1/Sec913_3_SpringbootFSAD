const ProgressBar = ({isProgress}) => {

    if(!isProgress)
        return null;

    return (

        <div style={{
            position:'fixed',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            background:'rgba(0,0,0,0.4)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            zIndex:'999'
        }}>

            <div style={{
                width:'50px',
                height:'50px',
                border:'5px solid #fff',
                borderTop:'5px solid #1d4ed8',
                borderRadius:'50%',
                animation:'spin 1s linear infinite'
            }}></div>

            <style>
                {`
                    @keyframes spin {
                        0%{
                            transform:rotate(0deg);
                        }
                        100%{
                            transform:rotate(360deg);
                        }
                    }
                `}
            </style>

        </div>
    );
}

export default ProgressBar;