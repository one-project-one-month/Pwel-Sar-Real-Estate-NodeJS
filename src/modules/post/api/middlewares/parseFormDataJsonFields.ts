import { RequestHandler } from 'express';

const parseFormDataJsonFields: RequestHandler = (req, res, next) => {
 
  try {
    if (typeof req.body.post === 'string') {
      req.body.post = JSON.parse(req.body.post);
    }
    if (typeof req.body.property === 'string') {
      req.body.property = JSON.parse(req.body.property);
    }
    if (typeof req.body.posts === 'string') {
      req.body.posts = JSON.parse(req.body.posts);
    }
    next();
  } catch {
    res
      .status(400)
      .json({ message: 'Invalid JSON in post, property, or posts field' });
    return;
  }
};

export default parseFormDataJsonFields;
