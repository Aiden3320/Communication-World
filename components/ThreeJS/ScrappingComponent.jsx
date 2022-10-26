import React, { useEffect, useState } from 'react'
import { createStyles, Stack, Burger, Button, Container, ActionIcon, Modal, Paper, Text, Title, LoadingOverlay, BackgroundImage } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useForm } from '@mantine/form';
import { saveAs } from 'file-saver'
import { IconDownload, IconWorldDownload } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { fetcher } from '../../lib/fetcher'
const useStyles = createStyles((theme) => ({
    card: {
        height: 440,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: 32,
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));
async function download(url) {
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function toDataURL(url) {
    return fetch(url)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            return URL.createObjectURL(blob);
        });
}
function Card({ image, title, category }) {
    const { classes } = useStyles();

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            sx={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {/* {image} */}
                    Image
                </Text>
            </div>
            <Button variant="white" color="dark"
                leftIcon={<IconDownload />}
                onClick={() => {
                    download(image);
                }}>
                Download
            </Button>
        </Paper>
    );
}
export default function ScrappingComponent({ handleLeftClickEvent, handleRightClickEvent }) {
    const [opened, setOpened] = useState(false);
    const [isScraping, setIsScraping] = useState(false);
    const title = opened ? 'Close navigation' : 'Open navigation';
    const [clicked, setClicked] = useState(false);
    const [data, setData] = useState([]);
    const [isHandling, setIsHandling] = useState(false);
    // const [opened, handlers] = useDisclosure(false);
    const handleScrapClick = async () => {
        setIsScraping(true);
        const url = "http://www.osmschool.com";
        //const url = "https://squarepanda.com/";
        const newData = await fetcher('http://localhost:3000/api/scrap/scrapfromURL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: url
            }),
        });
        // const url = "https://squarepanda.com/";
        setData(newData);
        setIsScraping(false);

        setClicked(!clicked);
        // console.log("newData", data);

    }
    return (<>

        <LoadingOverlay visible={isHandling} overlayBlur={2} />
        <Burger
            color="#45f50d"
            style={{ position: 'absolute', top: 20, right: 20 }}
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            title={title}
        />

        {
            opened &&
            // <BackgroundImage

            //     src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
            //     radius="sm"
            // >
            <Container style={{ width: 150, height: 70, position: 'absolute', top: 45, right: 25, backgroundColor: 'whilte', }}>
                <Modal
                    size="700px"
                    opened={clicked}
                    onClose={() => setClicked(false)}
                // title="Image Scrapped!"
                >
                    <Text color="teal" size="xl">Teal text</Text>
                    <Carousel
                        slideSize="30%"
                        breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
                        slideGap="xl"
                        align="start"
                        slidesToScroll={3}
                    >
                        {data.length >= 1 && data.map((item, index) => (
                            <Carousel.Slide key={index}>
                                <Card {...item} />
                            </Carousel.Slide>
                        ))}
                    </Carousel>

                </Modal>

                {/* <Text
                    align="center"
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    size="sm"
                    weight={700}
                    style={{ fontFamily: 'Greycliff CF, sans-serif' }}
                >
                    Control Panel
                </Text> */}
                {/* <div style={{ display: "flex", justifyContent: "space-between ", margin: "10px 30px 30px 30px" }}>
                    <ActionIcon onClick={handleLeftClickEvent} variant="light">
                        <IconArrowBigLeft size={46} />
                    </ActionIcon>
                    <ActionIcon onClick={handleRightClickEvent} variant="light">
                        <IconArrowBigRight size={46} />
                    </ActionIcon>
                </div> */}
                <Stack align="center">

                    <Button size="md" leftIcon={<IconWorldDownload size={15} />}
                        onClick={handleScrapClick}
                        loading={isScraping}>
                        Scrap
                    </Button>
                </Stack>
            </Container>
            // </BackgroundImage>

        }

    </>
    )
}