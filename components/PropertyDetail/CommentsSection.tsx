import { ArrowRightIcon } from '@heroicons/react/outline';
import CommentListing from '../../components/CommentListing';
import SpinnerButton from "../../components/SpinnerButton";
import { useDispatch, useSelector } from 'react-redux';
import ButtonCircle from "../../shared/Button/ButtonCircle";
import Input from "../../shared/Input"
import { createNewCommentAction } from "../../redux/comments/comments.actions";
import FiveStartIconForRate from './FiveStartIconForRate';

type Props = {
    newComment?: any;
    setNewComment?: any;
    hasListingTitle?: boolean;
}


const CommentsSection:any = ({ newComment, setNewComment }: Props) => {
    const dispatch:any = useDispatch();
    const { comments, loading } = useSelector(
        ({ comments }: any) => comments
    );
    const handleSendComment = () => {
        dispatch(createNewCommentAction(newComment));
    };


        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">
                    <span>
                        Comentarios ({comments?.length || 0}{" "}
                        {comments?.length === 1 ? "Comentario" : "Comentarios"})
                    </span>
                </h2>
                <div className="border-b w-20 border-neutral-200 dark:border-neutral-700"></div>

                {/* Content */}
                <div className="space-y-5">
                    <FiveStartIconForRate
                        iconClass="w-6 h-6"
                        className="space-x-0.5"
                        newComment={newComment}
                        setNewComment={setNewComment}
                    />
                    <Input
                        fontClass=""
                        sizeClass="h-16 px-4 py-3"
                        rounded="rounded-3xl"
                        placeholder="Nombre"
                        value={newComment.name}
                        name="name"
                        onChange={(e) =>
                            setNewComment({
                                ...newComment,
                                name: e.target.value,
                            })
                        }
                    />
                    <div className="relative">
                        <Input
                            fontClass=""
                            sizeClass="h-16 px-4 py-3"
                            rounded="rounded-3xl"
                            placeholder="Deja un comentario"
                            value={newComment.comment}
                            name="comment"
                            onChange={(e) =>
                                setNewComment({
                                    ...newComment,
                                    comment: e.target.value,
                                })
                            }
                        />
                        <ButtonCircle
                            className="absolute transform -translate-y-1/2 right-2 top-1/2"
                            size=" w-12 h-12 "
                            onClick={handleSendComment}
                        >
                            {loading ? (
                                <SpinnerButton />
                            ) : (
                                <ArrowRightIcon className="w-5 h-5" />
                            )}
                        </ButtonCircle>
                    </div>
                </div>
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {comments &&
                        comments.map((data: any, index: number) => (
                            <CommentListing
                                key={index}
                                data={data}
                                className="py-8"
                            />
                        ))}
                </div>
            </div>
        );
};

export default CommentsSection