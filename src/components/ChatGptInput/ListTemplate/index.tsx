import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import MYMYapi from "../../../api/mymy";
import TemplateItem from "./TemplateItem";
import "./index.scss";

function AllCollapseExample(props: any) {
  const [listTemplateItem, setListTemplateItem] = useState([]);

  const { setSelectedItem, selectedItem } = props;
  // const [selectedItem, setSelectedItem] = useState(null);

 

  useEffect(() => {
    MYMYapi.getPromptTemplateData().then((res) => {
      // setListTemplateItem(res.data);
      setListTemplateItem(res.data);
      setSelectedItem(res.data[0]);
    });
  }, []);

  return (
    <Accordion className="list-template-select" >
      <Accordion.Item eventKey="0" style={{
        padding: '0px',
      }}>
        <Accordion.Header>
          {selectedItem && <TemplateItem item={selectedItem} />}
        </Accordion.Header>
        <Accordion.Body className="list-template-items" >
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
