import "./index.scss";
import ArticleIcon from "@mui/icons-material/Article";
import { useAccordionButton } from "react-bootstrap";

const TemplateItem = ({
  isList,
  item,
  onSelectedItem,
}: {
  isList?: boolean;
  item: any;
  onSelectedItem?: any;
}) => {
  const decoratedOnClick = useAccordionButton("0", () =>
    console.log('totally custom!'),
  );
  const selectedHandler = (e: any) => {
    if (onSelectedItem) {
      onSelectedItem(item);
      decoratedOnClick(e);
    }
  };
  return (
    <div
      className={"template-item" + (isList ? " hover" : "")}
      onClick={selectedHandler}
    >
      <div className="template-item__title">
        <ArticleIcon />
        {item.name}
      </div>
      <div className="template-item__description">{item.desc}</div>
    </div>
  );
};

export default TemplateItem;
