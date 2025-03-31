import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    TextField,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
} from "@mui/material";
import AWS from "aws-sdk";

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState("");

    // AWS S3 Configuration
    const s3 = new AWS.S3({
        region: "us-east-2",
        accessKeyId: "AKIAR7HWX3DHL4OA655N",
        secretAccessKey: "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",
    });

    const bucketName = "books-uploaded";

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setPdfFile(file);
            const params = {
                Bucket: bucketName,
                Key: file.name,
                Body: file,
                ContentType: file.type,
            };

            try {
                const data = await s3.upload(params).promise();
                setUploadMessage(`File uploaded successfully: ${data.Location}`);
            } catch (error) {
                setUploadMessage("Error uploading file: " + error.message);
            }
        }
    };


    const S3_BASE_URL = "https://book-thumbnail.s3.us-east-2.amazonaws.com/img/";

    const books = [
        { id: 1, title: "A Court of Thorns and Roses", author: "Sarah J. Maas", image: `${S3_BASE_URL}Book1.png` },
        { id: 2, title: "Everything I Know About Love: A Memoir", author: "Dolly Alderton", image: `${S3_BASE_URL}Book 2.png` },
        { id: 3, title: "Funny Story", author: "Emily Henry", image: `${S3_BASE_URL}Book 3.png` },
        { id: 4, title: "The Heaven & Earth Grocery Store: A Novel", author: "James McBride", image: `${S3_BASE_URL}Book 4.png` },
        { id: 5, title: "Crying in H Mart", author: "Michelle Zauner", image: `${S3_BASE_URL}Book 5.png` },
        { id: 6, title: "James: A Novel", author: "Percival Everett", image: `${S3_BASE_URL}Book 6.png` },
        { id: 7, title: "The Midnight Library: A GMA Book Club Pick: A Novel", author: "Matt Haig", image: `${S3_BASE_URL}Book 7.png` },
        { id: 8, title: "Dog Man: The Scarlet Shedder", author: "Dav Pilkey", image: `${S3_BASE_URL}Book 8.png` },

    ];

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>E-Reader</Typography>
                    <input
                        type="file"
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        id="pdf-upload"
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="pdf-upload">
                        <Button variant="contained" color="secondary" component="span">
                            Upload PDF
                        </Button>
                    </label>
                </Toolbar>
            </AppBar>
            {/* Main Content */}
            <Container>
                <Typography variant="h4" gutterBottom>My Library</Typography>
                <TextField
                    fullWidth
                    label="Search for a book..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    margin="normal"
                />
                <Grid container spacing={3}>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <Grid item xs={12} sm={6} md={3} key={book.id}>
                                <Card>
                                    <CardMedia component="img" height="200" image={book.image} alt="Book Cover" />
                                    <CardContent>
                                        <Typography variant="h6">{book.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">Author: {book.author}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" color="error">No books found.</Typography>
                    )}
                </Grid>
                {uploadMessage && (
                    <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
                        {uploadMessage}
                    </Typography>
                )}
            </Container>

            {/* Footer */}
            <AppBar position="static" color="primary" className="footer">
                <Toolbar>
                    <Typography variant="body2" color="inherit">&copy; 2025 E-Reader. All rights reserved.</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Dashboard;
