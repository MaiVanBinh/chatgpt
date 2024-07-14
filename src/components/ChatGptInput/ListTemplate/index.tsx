import { useEffect, useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import MYMYapi from "../../../api/mymy";
import TemplateItem from "./TemplateItem";
import "./index.scss";

function AllCollapseExample(props: any) {
  const [listTemplateItem, setListTemplateItem] = useState([]);

  const { setSelectedItem, selectedItem } = props;
  // const [selectedItem, setSelectedItem] = useState(null);
  const accordionRef = useRef<any>(null); // Ref to the Accordion for detecting outside clicks
  const [open, setOpen] = useState(false); // State to manage Accordion open/close
  const closeAccordion = () => setOpen(false);

  // Toggle Accordion open/close

  const handleDocumentClick = (e: any) => {
    if (accordionRef.current && !accordionRef.current.contains(e.target)) {
      closeAccordion();
    }
  };
  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("click", handleDocumentClick);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    MYMYapi.getPromptTemplateData().then((res) => {
      // setListTemplateItem(res.data);
      setListTemplateItem(res.data);
      setSelectedItem(res.data[0]);
    });
  }, []);

  return (
    <Accordion
      ref={accordionRef}
      className="list-template-select"
      accessKey="1"
      activeKey={open ? "0" : ""}
    >
      <Accordion.Item
        eventKey="0"
        style={{
          padding: "0px",
        }}
      >
        <Accordion.Header onClick={() => setOpen(true)}>
          {selectedItem && <TemplateItem item={selectedItem} />}
        </Accordion.Header>
        <Accordion.Body className="list-template-items" onClick={() => setOpen(false)}>
          <div>
            {listTemplateItem?.map((item, index) => (
              <TemplateItem
                isList={true}
                key={index}
                item={item}
                onSelectedItem={setSelectedItem}
                
              />
            ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AllCollapseExample;
