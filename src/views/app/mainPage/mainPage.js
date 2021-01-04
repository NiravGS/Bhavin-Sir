import React from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import { auth } from '../../../helpers/Firebase'
import IntlMessages from '../../../helpers/IntlMessages'


const LeftCard = ({ img, title, list }) => (<Row className="mt-5 mb-5" >
  <div className="col-5 mr-2" >
    <div style={{ textAlign: "right" }}>
      <img style={{ maxWidth: "100%", borderStyle: "none" }} src={require(`../../../assets/img/${img}`)} alt="feature" />
    </div>
  </div>
  <div className="col-6">
    <div>
      <div style={{ width: "108px", marginBottom: "32px" }}>
        <img className="w-100" src={require('../../../assets/img/colaboration.png')} alt="feature" />
      </div>
      <span style={{
        color: " #ff8a00",
        fontWeight: "600",
        fontFamily: "Josefin Sans,sans-serif",
        textTransform: "capitalize",
        display: "block",
        fontSize: "18px",
        marginBottom: "27px"
      }}>Collaboration</span>
      <h5 style={{
        fontWeight: "700",
        marginBottom: "10px",
        fontSize: "24px",
        lineHeight: "28px",
        color: "#3C368C",
        marginTop: "-9px",
      }}>{title}</h5>
      <ul className="mt-4">
        {list.map(item =>
          <li style={{
            color: "#659AE3", padding: "0",
            marginBottom: "10px",
            fontSize: "18px",
            fontWeight: 600,
          }}>
            {item}
          </li>
        )}
      </ul>
    </div>
  </div>
</Row>)

const RightCard = ({ img, title, list }) => (<Row className="mt-5 mb-5">
  <div className="col-5 mr-2" >
    <div>
      <div style={{ width: "108px", marginBottom: "32px" }}>
        <img className="w-100" src={require('../../../assets/img/colaboration.png')} alt="feature" />
      </div>
      <span style={{
        color: " #ff8a00",
        fontWeight: "600",
        fontFamily: "Josefin Sans,sans-serif",
        textTransform: "capitalize",
        display: "block",
        fontSize: "18px",
        marginBottom: "27px"
      }}>Collaboration</span>
      <h5 style={{
        fontWeight: "700",
        marginBottom: "10px",
        fontSize: "24px",
        lineHeight: "28px",
        color: "#3C368C",
        marginTop: "-9px",
      }}>{title}</h5>
      <ul className="mt-4">
        {list.map(item =>
          <li style={{
            color: "#659AE3", padding: "0",
            marginBottom: "10px",
            fontSize: "18px",
            fontWeight: 600,
          }}>
            {item}
          </li>
        )}
      </ul>
    </div>
  </div>
  <div className="col-6 ">
    <div style={{ textAlign: "right" }}>
      <img style={{ maxWidth: "100%", borderStyle: "none" }} src={require(`../../../assets/img/${img}`)} alt="feature" />
    </div>
  </div>
</Row>
)


const feuresData = [
  {
    "img": 'feat1.png',
    "title": 'Data Integration',
    "list": [
      'Metadata Driven framework that automates building ingestion pipelines.',
      'Simplify the process of building complex and scalable data migration and ELT/ETL pipelines all with a few clicks',
      'Configure and maintain various systems, only once.',
      'Implementing your transformations with no coding',
      'Create and maintain the datalake in a more useful and organized way',
      'Integrated with Data Quality and Data Privacy',
      'Manage all your processes in a highly governed ecosystem'
    ]
  },
  {
    "img": 'feat2.png',
    "title": 'Data Quality ',
    "list": [
      'ML powered system with data stewardship',
      'Fully managed DQ interactive dashboard for better decision making.',
      '26 + data quality checks by slicing and dicing the data deep till column level.',
      'Create your custom data quality rules with just a few clicks.',
      'Interactive User-friendly UI to create complex data quality rules with knowledge on data and no coding',
      'Broad data source connectivity with support for cloud and native databases along with cloud-based file storage systems '
    ]
  },
  {
    "img": 'feat3.png',
    "title": 'Data Privacy ',
    "list": [
      'Discover and manage personal and sensitive data across your entire ecosystem',
      'Powered by deep learning and ML Generate compliance reports for GDPR, CCPA etc., with ease',
      'Protect sensitive information with custom alerts',
      'Manage all requests from one place - privacy portal',
      'Automatically catalog sensitive information across the ecosystem',
      'Pattern recognition and ML based classification',
      'Broad connectivity to various systems.'
    ]
  }
]
const MainPage = () => {
  const { messages } = useIntl()

  document.querySelector('#app-container').classList.remove('menu-default');
  document.querySelector('#app-container').classList.add('menu-hidden');

  return (
    <>
      <Row>
        <Col>
          <h3>{`${messages['label.welcome']}, ${auth?.currentUser?.displayName}`}</h3>
        </Col>
      </Row>
      
      {feuresData.map((item, index) => index % 2 === 0 ?
        <LeftCard img={item.img} title={item.title} list={item.list} /> :
        <RightCard img={item.img} title={item.title} list={item.list} />)
      }

    </>
  )
}
export default MainPage
