import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Link, Image, PDFDownloadLink } from '@react-pdf/renderer';
// import Gilroy from '../../../public/fonts/Gilroy-Regular.ttf';
// import GilroyBold from '../../../public/fonts/Gilroy-Bold.ttf';
import useConfig from '../../hooks/useConfig';


Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

Font.register({
    family: 'Roboto',
    fontWeight: 700,
    src: 'https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.10.0/font/roboto/Roboto-Bold.ttf',
});

const styles = StyleSheet.create({
    body: {
        fontFamily: 'Roboto',
        border: 'none',
    },
    title: {
        fontSize: '24px',
        textAlign: 'center',
        width: '100%'
    },  
    subtitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginTop: 0,
        textAlign: 'center',
        width: '100%'
    },
    page: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        fontFamily: 'Roboto'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    table: {
        display: 'table',
        borderStyle: 'solid',
        borderRadius: '20px',
        border: '1px solid var(--Stroke-100, #DCE2EB)',
        background: 'var(--Backgrounds-100, #FFF)',
        borderWidth: 1,
        textAlign: 'left',
        marginBottom: 10,
        padding: '25px',
    },
    tableRow: {
        flexDirection: 'row',
        textAlign: 'left',
    },
    tableCell: {
        padding: 5,
        display: 'table-cell',
    },
    tableTitle: {
        fontSize: '12px',
        color: '#444b55',
        fontWeight: 'bold'
    },
    tableValue: {
        fontSize: '12px',
        color: '#444b55'
    },
    Text: {
        marginBottom: 2,
        fontWeight: 700
    },
    bottomText: {
        fontSize: '24px',
        width: '100%',
        textAlign: 'center',
        color: '#111',
        fontWeight: 'bold',
    },
    bottomTextColored: {
        color: '#7BAD3B',
        fontWeight: 'bold',
    }
    
});

const userFields = /email|phone|name|second_name|last_name/;

const paymentDetailFields = /status|liqpay_order_id|amount|currency/;

const KEY_SEPARATOR = '~';
const paymentFields = [
    'status',
    'liqpay_order_id',
    `amount${KEY_SEPARATOR}currency`,
];

const titles = {
    status: 'Статус оплати',
    liqpay_order_id: 'Номер замовлення',
    amount: 'Сума',
    currency: 'Валюта',
    email: 'Email',
    phone: 'Телефон',
    name: 'Ім\'я',
    second_name: 'По батькові',
    last_name:  'Прізвище',
    [`amount${KEY_SEPARATOR}currency`]: 'Сума'
};



export default function SummaryDocument({
    bookingResult = {},
}) {

    const { project_title, manager, pdf, logo_src } = useConfig();

    return (
        <Document>
            <Page size="A4" style={{
                    ...styles.page,
                    backgroundColor: pdf.background_color,
                }}>
                <View style={styles.section}>
                    <Image src={logo_src} style={{
                        width: 'auto',
                        height: 50,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginBottom: 10,
                    }}/>
                    <Text style={styles.title}>{project_title}</Text>
                    <Text style={styles.subtitle}>{bookingResult.description}</Text>
                </View>
                <View style={{
                        ...styles.section,
                        width: '100%',
                    }}>
                    
                    <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCell}>
                                    <Text style={styles.Text}>Дані користувача:</Text>
                                </View>
                                <View style={styles.tableCell}>
                                    
                                </View>
                            </View>
                            {Object.entries(bookingResult)
                                .filter(([key,val]) => userFields.test(key))
                                .map(([key, value]) => (
                                    <>
                                        <View style={styles.tableRow}>
                                            <View style={{
                                                ...styles.tableCell,
                                                width: '30%',
                                            }}>
                                                <Text style={styles.tableTitle}>{titles[key]}:</Text>
                                            </View>
                                            <View style={styles.tableCell}>
                                                <Text style={styles.tableValue}>{value}</Text>
                                            </View>
                                        </View>
                                    </>
                                )
                            )}
                    </View>
                </View>
                <View style={{
                        ...styles.section,
                        width: '100%',
                    }}>
                        
                        <View style={styles.table}>
                            <View style={styles.tableRow} >
                                <View style={styles.tableCell}>
                                    <Text style={styles.Text}>Дані по оплаті:</Text>
                                </View>
                                <View style={styles.tableCell}>
                                </View>
                            </View>
                            {
                                paymentFields.map((key) => {
                                    const keysArray = key.split(KEY_SEPARATOR);
                                    return  (
                                        <View style={styles.tableRow} key={key}>
                                            <View style={{
                                                ...styles.tableCell,
                                                width: '30%',
                                            }}>
                                                <Text  style={styles.tableTitle}>{titles[key]}:</Text>
                                            </View>
                                            <View style={styles.tableCell}>
                                                <Text style={styles.tableValue}>{keysArray.map((k) => bookingResult[k])}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.bottomText}>Менеджер для зв&apos;язку</Text>
                    <Text style={styles.bottomText}>
                        {manager.name} <Link src={`tel:${manager.phone}`} style={styles.bottomTextColored}>{manager.phone}</Link>
                    </Text>
                    
                </View>
            </Page>
        </Document>
    )
}
